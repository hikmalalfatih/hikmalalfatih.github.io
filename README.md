# Hikmal Alfatih — Apple Hardware & AI Portfolio

A responsive, Apple-inspired portfolio built with Next.js App Router, React,
TypeScript, Tailwind CSS, Framer Motion, and Lucide React. The site is exported
as static files to `out/` and hosted on GitHub Pages. Contact and guestbook APIs,
database, and photo storage run separately on Supabase; email notifications use
Resend.

## Run locally

```bash
npm ci
Copy-Item .env.example .env.local
npm run dev
```

Open [http://localhost:3000](http://localhost:3000). The public Supabase values
must be set in `.env.local` to use the contact form and guestbook. Never put
service-role keys, Resend keys, or the server salt in `NEXT_PUBLIC_*` values.

## Build and checks

```bash
npm test
npm run typecheck
npm run build
```

The production static export is written to `out/`. GitHub Actions publishes
that directory from the `main` branch. Configure the optional build-time
variables `NEXT_PUBLIC_SUPABASE_URL`, `NEXT_PUBLIC_SUPABASE_ANON_KEY`, and
`NEXT_PUBLIC_TURNSTILE_SITE_KEY` under **Repository Settings → Secrets and
variables → Actions → Variables**. Supabase's anon key is designed for
browser use; Row Level Security and the Edge Functions restrict database writes.

## Supabase and Resend backend setup

GitHub Pages serves static HTML, CSS, and JavaScript only; it does not execute
Next.js Route Handlers or other server code. This project therefore uses
Supabase Edge Functions as its independent API host. Never add backend secrets
to GitHub Pages variables or the static app.

1. Create a Supabase project and copy its project URL, anon key, and service-role
   key from **Project Settings → API**.
2. Install the Supabase CLI, authenticate with `npx supabase login`, link the
   project with `npx supabase link --project-ref YOUR_PROJECT_REF`, then apply
   the database and public `avatars` bucket migration:

   ```bash
   npx supabase db push
   ```

   The migration creates private contact-message storage, a moderated public
   guestbook, hashed-IP rate-limit storage, and the public-read-only avatar
   bucket. No anonymous database writes are granted.
3. Create a Resend account and API key. The default sender is
   `onboarding@resend.dev`; Resend's sandbox only delivers to the account
   owner's address. For a production sender, verify a domain with Resend and
   configure `CONTACT_FROM_EMAIL`.
4. Set server-only function secrets. Replace each example with values from your
   provider; generate `SERVER_SALT` with a cryptographically secure random
   value of at least 32 characters:

   ```bash
   npx supabase secrets set --project-ref YOUR_PROJECT_REF `
     SUPABASE_URL="https://YOUR_PROJECT_REF.supabase.co" `
     SUPABASE_SERVICE_ROLE_KEY="YOUR_SERVICE_ROLE_KEY" `
     RESEND_API_KEY="YOUR_RESEND_API_KEY" `
     CONTACT_TO_EMAIL="YOUR_PRIVATE_RECIPIENT_ADDRESS" `
     CONTACT_FROM_EMAIL="onboarding@resend.dev" `
     SERVER_SALT="REPLACE_WITH_A_RANDOM_32_CHARACTER_OR_LONGER_VALUE" `
     SITE_URL="https://hikmalalfatih.github.io"
   ```

   If enabling Cloudflare Turnstile, also set `TURNSTILE_SECRET_KEY` here and
   `NEXT_PUBLIC_TURNSTILE_SITE_KEY` as a GitHub Actions variable. The site key
   is public; the secret is not.
5. Deploy the public functions:

   ```bash
   npx supabase functions deploy contact --project-ref YOUR_PROJECT_REF --no-verify-jwt
   npx supabase functions deploy comments --project-ref YOUR_PROJECT_REF --no-verify-jwt
   npx supabase functions deploy avatar-upload --project-ref YOUR_PROJECT_REF --no-verify-jwt
   ```

   Public invocation is intentional. Each function checks the configured
   `SITE_URL`, validates input, applies honeypot and rate limits, and uses only
   the server-side service-role key for database or Storage operations.
6. Add the project URL and anon key as GitHub Actions variables named
   `NEXT_PUBLIC_SUPABASE_URL` and `NEXT_PUBLIC_SUPABASE_ANON_KEY`. Add the
   optional Turnstile site key if enabled. Push to `main`, or run
   **Actions → Deploy to GitHub Pages → Run workflow** to rebuild the site with
   these public endpoint values.
7. Verify the message API using the browser form or `curl` from the published
   origin. A contact submit must take at least three seconds to avoid the
   anti-bot honeypot:

   ```bash
   curl -i "https://YOUR_PROJECT_REF.supabase.co/functions/v1/contact" `
     -H "Origin: https://hikmalalfatih.github.io" `
     -H "Content-Type: application/json" `
     -H "apikey: YOUR_PUBLIC_ANON_KEY" `
     -d "{\"name\":\"Test Visitor\",\"email\":\"visitor@example.com\",\"message\":\"I am testing the portfolio contact form.\",\"website\":\"\",\"startedAt\":0}"

   curl -i "https://YOUR_PROJECT_REF.supabase.co/functions/v1/comments?limit=20" `
     -H "Origin: https://hikmalalfatih.github.io" `
     -H "apikey: YOUR_PUBLIC_ANON_KEY"
   ```

   The example contact request deliberately returns the fake success response
   because its `startedAt` is old; use the actual form for an end-to-end email
   test. Delete test rows afterward if desired.

### Backend endpoints and data safety

- `POST /functions/v1/contact`: validates and stores a private message, then
  sends an escaped HTML/plain-text notification through Resend. Limits: 3
  messages per hashed network address per 10 minutes.
- `GET|POST /functions/v1/comments`: returns only visible comments and accepts
  plain-text guestbook messages. Limits: 5 posts per hashed address per 10
  minutes. Hide abuse by setting `comments.is_visible = false` in Supabase.
- `POST /functions/v1/avatar-upload`: accepts metadata for a resized WebP
  image and returns a short-lived signed upload URL. The browser resizes
  selected JPEG/PNG/WebP files to a 256×256 WebP first (maximum 1 MB uploaded).
- Rate-limit records contain a salted SHA-256 hash, not a raw IP address.
  Contact rows do store the request's user-agent for troubleshooting.
- Unused signed avatar uploads may be removed from **Storage → avatars**.
  To identify candidates, compare object names with `comments.avatar_path` and
  remove files that are not referenced after allowing recent guestbook posts
  time to finish. The bucket is public-read and does not allow anonymous writes.
- GitHub Pages does not support custom HTTP response headers. The site includes
  a restrictive Content Security Policy and referrer policy in HTML metadata;
  Edge Function responses also set `X-Content-Type-Options: nosniff`. For
  response-level security headers on the static website, place a configurable
  CDN/proxy in front of GitHub Pages.

## CV data and assets

Personal profile facts, work history, education, projects, credentials, skills,
and social links are maintained in `app/data/profile.ts`. `public/resume.pdf`
is the CV PDF currently available in the workspace. The supplied profile portrait, Machine Expert certificate, and Azul Home
screenshot are included in `public/images/profile.jpeg`,
`public/certificates/machine-expert.jpg`, and `public/projects/azul-home.png`.
Other optional visual assets:

- Replace those images at the same paths to update them.

GitHub and Instagram links are omitted while their values are blank in
`app/data/profile.ts`. The Daily Rotation card embeds the Spotify playlist
configured by `spotifyEmbedUrl` there.

### Education and experience logos

Logo paths for each school and workplace are listed in `app/data/profile.ts`.
Add your image files at the matching locations:

- Education: `public/logos/education/`
- Workplaces: `public/logos/experience/`

Expected filenames are `universitas-terbuka.png`, `ppkd-jakarta-barat.png`,
`alfachriyah.png`, `sma-95.png`, `applenesia.png`, `eka-putra-berkat.png`,
`icolor-digital.png`, and `myrepublic.png`. To use a different filename,
update that entry's `logo` path in `app/data/profile.ts`. PNG, JPG, and WebP
images are supported. Until a file is added, the organization initials remain
visible automatically.

## Manual QA checklist

- Test at 360, 768, 1024, and 1440 CSS pixels; confirm there is no horizontal
  page overflow and the navigation remains usable.
- Reload the page and verify that every greeting in the multilingual splash
  appears at a readable pace, then confirm the final welcome message remains
  visible before the galaxy and portfolio fade in. Check reduced-motion behavior.
- Confirm the galaxy appears immediately after the multilingual splash, its
  stars twinkle and meteors fall, and its layers move with scrolling while the
  four-item navbar stays fixed and translucent panels remain readable.
- Navigate all four anchors by mouse and keyboard; confirm the active nav and
  URL hash follow the visible section.
- Use the portfolio tabs with mouse and arrow keys; open and close the project
  dialog and certificate lightbox with keyboard controls.
- Submit valid and invalid contact/guestbook data, test a resized photo, and
  check success, network errors, empty comments, and pagination.
- Verify the deployed site has no browser-console errors. Configure real
  Supabase and Resend credentials before treating backend delivery as live.
