create extension if not exists pgcrypto with schema extensions;

create table if not exists public.contact_messages (
  id uuid primary key default gen_random_uuid(),
  name text not null check (char_length(name) between 2 and 60),
  email text not null check (char_length(email) <= 254),
  message text not null check (char_length(message) between 10 and 2000),
  ip_hash text not null,
  user_agent text not null default '',
  created_at timestamptz not null default now()
);

create table if not exists public.comments (
  id uuid primary key default gen_random_uuid(),
  name text not null check (char_length(name) between 2 and 60),
  message text not null check (char_length(message) between 2 and 500),
  avatar_path text,
  ip_hash text not null,
  is_visible boolean not null default true,
  created_at timestamptz not null default now()
);

create index if not exists comments_visible_created_at_idx
  on public.comments (created_at desc)
  where is_visible = true;

create table if not exists public.rate_limit_hits (
  id bigint generated always as identity primary key,
  action text not null check (action in ('contact', 'comment', 'avatar')),
  ip_hash text not null,
  created_at timestamptz not null default now()
);

create index if not exists rate_limit_hits_lookup_idx
  on public.rate_limit_hits (action, ip_hash, created_at desc);

alter table public.contact_messages enable row level security;
alter table public.comments enable row level security;
alter table public.rate_limit_hits enable row level security;

revoke all on public.contact_messages from anon, authenticated;
revoke all on public.rate_limit_hits from anon, authenticated;
revoke insert, update, delete on public.comments from anon, authenticated;
grant select on public.comments to anon, authenticated;
drop policy if exists "Public can read visible comments" on public.comments;
create policy "Public can read visible comments"
  on public.comments for select to anon, authenticated
  using (is_visible = true);

create or replace function public.claim_rate_slot(
  p_action text,
  p_ip_hash text,
  p_limit integer,
  p_window_seconds integer default 600
) returns boolean
language plpgsql
security definer
set search_path = public, pg_temp
as $$
declare
  current_count integer;
begin
  if p_action not in ('contact', 'comment', 'avatar')
     or p_limit < 1
     or p_window_seconds < 1
     or p_ip_hash !~ '^[0-9a-f]{64}$' then
    raise exception 'invalid rate-limit arguments';
  end if;

  perform pg_advisory_xact_lock(hashtextextended(p_action || ':' || p_ip_hash, 0));
  delete from public.rate_limit_hits
    where created_at < now() - interval '2 days';
  select count(*) into current_count
    from public.rate_limit_hits
    where action = p_action
      and ip_hash = p_ip_hash
      and created_at >= now() - make_interval(secs => p_window_seconds);
  if current_count >= p_limit then
    return false;
  end if;
  insert into public.rate_limit_hits (action, ip_hash) values (p_action, p_ip_hash);
  return true;
end;
$$;

revoke all on function public.claim_rate_slot(text, text, integer, integer) from public, anon, authenticated;
grant execute on function public.claim_rate_slot(text, text, integer, integer) to service_role;

insert into storage.buckets (id, name, public, file_size_limit, allowed_mime_types)
values ('avatars', 'avatars', true, 1048576, array['image/webp'])
on conflict (id) do update
set public = excluded.public,
    file_size_limit = excluded.file_size_limit,
    allowed_mime_types = excluded.allowed_mime_types;

drop policy if exists "Public can read guestbook avatars" on storage.objects;
create policy "Public can read guestbook avatars"
  on storage.objects for select to public
  using (bucket_id = 'avatars');

comment on table public.contact_messages is 'Private portfolio contact form messages. Access only through the service role.';
comment on table public.comments is 'Public guestbook entries. Hide abusive entries by setting is_visible to false.';
