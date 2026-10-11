"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { AtSign, BriefcaseBusiness, Camera, Code2, LoaderCircle, Mail, MessageCircle, Paperclip, Send, UserRound } from "lucide-react";
import { contactSchema, commentSchema } from "../lib/schemas";
import { profile, socialLinks } from "../data/profile";
import Reveal from "./Reveal";

type GuestComment = {
  id: string;
  name: string;
  message: string;
  avatar_url: string | null;
  created_at: string;
};

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL?.replace(/\/$/, "");
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

export default function ContactSection() {
  const [contactState, setContactState] = useState({ loading: false, message: "", error: false });
  const [commentState, setCommentState] = useState({ loading: false, message: "", error: false });
  const [messageLength, setMessageLength] = useState(0);
  const [commentLength, setCommentLength] = useState(0);
  const [comments, setComments] = useState<GuestComment[]>([]);
  const [commentsLoading, setCommentsLoading] = useState(true);
  const [commentsError, setCommentsError] = useState("");
  const [hasMore, setHasMore] = useState(false);
  const [avatar, setAvatar] = useState<File | null>(null);
  const [turnstileToken, setTurnstileToken] = useState("");
  const [commentTurnstileToken, setCommentTurnstileToken] = useState("");
  const [contactTurnstileGeneration, setContactTurnstileGeneration] = useState(0);
  const [commentTurnstileGeneration, setCommentTurnstileGeneration] = useState(0);
  const contactStartedAt = useRef(Date.now());
  const commentStartedAt = useRef(Date.now());

  const headers = useCallback(() => {
    if (!supabaseUrl || !supabaseAnonKey) {
      throw new Error("The contact service is not configured yet. Please try again later.");
    }
    return { "Content-Type": "application/json", apikey: supabaseAnonKey, Authorization: `Bearer ${supabaseAnonKey}` };
  }, []);

  const loadComments = useCallback(async (before?: string) => {
    setCommentsLoading(true);
    setCommentsError("");
    try {
      const auth = headers();
      const params = new URLSearchParams({ limit: "20" });
      if (before) params.set("before", before);
      const response = await fetch(`${supabaseUrl}/functions/v1/comments?${params}`, { headers: auth });
      const result = await response.json();
      if (!response.ok) throw new Error(result.error ?? "Comments could not be loaded.");
      const nextComments = result.comments as GuestComment[];
      setComments((current) => before ? [...current, ...nextComments] : nextComments);
      setHasMore(Boolean(result.hasMore));
    } catch (error) {
      setCommentsError(error instanceof Error ? error.message : "Comments could not be loaded.");
    } finally {
      setCommentsLoading(false);
    }
  }, [headers]);

  useEffect(() => {
    void loadComments();
  }, [loadComments]);

  const submitContact = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const formElement = event.currentTarget;
    const form = new FormData(formElement);
    const parsed = contactSchema.safeParse({
      name: form.get("name"),
      email: form.get("email"),
      message: form.get("message"),
      website: form.get("website"),
      startedAt: contactStartedAt.current,
      turnstileToken,
    });
    if (!parsed.success) {
      setContactState({ loading: false, error: true, message: parsed.error.issues[0]?.message ?? "Please check your details." });
      return;
    }
    setContactState({ loading: true, error: false, message: "" });
    try {
      const response = await fetch(`${supabaseUrl}/functions/v1/contact`, {
        method: "POST",
        headers: headers(),
        body: JSON.stringify(parsed.data),
      });
      const result = await response.json();
      if (!response.ok) throw new Error(result.error ?? "Your message could not be sent.");
      setContactState({ loading: false, error: false, message: "Message sent! I’ll reply soon." });
      formElement.reset();
      setMessageLength(0);
      setTurnstileToken("");
      setContactTurnstileGeneration((generation) => generation + 1);
    } catch (error) {
      setContactState({ loading: false, error: true, message: error instanceof Error ? error.message : "Your message could not be sent." });
    }
  };

  const submitComment = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const formElement = event.currentTarget;
    const form = new FormData(formElement);
    const parsed = commentSchema.safeParse({
      name: form.get("commentName"),
      message: form.get("comment"),
      website: form.get("commentWebsite"),
      startedAt: commentStartedAt.current,
      turnstileToken: commentTurnstileToken,
    });
    if (!parsed.success) {
      setCommentState({ loading: false, error: true, message: parsed.error.issues[0]?.message ?? "Please check your comment." });
      return;
    }
    setCommentState({ loading: true, error: false, message: "" });
    try {
      let avatarPath: string | undefined;
      if (avatar) avatarPath = await uploadAvatar(avatar, headers, commentTurnstileToken);
      const response = await fetch(`${supabaseUrl}/functions/v1/comments`, {
        method: "POST",
        headers: headers(),
        body: JSON.stringify({ ...parsed.data, avatarPath }),
      });
      const result = await response.json();
      if (!response.ok) throw new Error(result.error ?? "Your comment could not be posted.");
      setCommentState({ loading: false, error: false, message: "Thanks for signing the guestbook." });
      formElement.reset();
      setCommentLength(0);
      setAvatar(null);
      setCommentTurnstileToken("");
      setCommentTurnstileGeneration((generation) => generation + 1);
      await loadComments();
    } catch (error) {
      setCommentState({ loading: false, error: true, message: error instanceof Error ? error.message : "Your comment could not be posted." });
    }
  };

  return (
    <section id="contact" className="page-section" aria-labelledby="contact-title">
      <Reveal><div className="section-heading"><p className="eyebrow">Questions, repairs, collaborations</p><h2 id="contact-title">Get in Touch</h2><p className="muted-copy">I’d be glad to hear what you’re working on.</p></div></Reveal>
      <div className="contact-grid">
        <Reveal className="contact-column">
          <div className="glass contact-card">
            <h3 className="panel-heading"><Mail /> Let’s Talk</h3>
            <p className="muted-copy">Got a device that won’t power on, or a project idea? Send me a message and I’ll get back to you.</p>
            <form className="form-stack" onSubmit={submitContact} noValidate>
              <label className="field-label">Name<span className="input-wrap"><UserRound size={17} /><input name="name" autoComplete="name" required minLength={2} maxLength={60} /></span></label>
              <label className="field-label">Email<span className="input-wrap"><AtSign size={17} /><input name="email" type="email" autoComplete="email" required maxLength={254} /></span></label>
              <label className="field-label">Message<span className="input-wrap textarea-wrap"><MessageCircle size={17} /><textarea name="message" required minLength={10} maxLength={2000} rows={5} onChange={(event) => setMessageLength(event.target.value.length)} /></span><small className="character-count">{messageLength}/2000</small></label>
              <label className="honeypot" aria-hidden="true">Leave this empty<input name="website" tabIndex={-1} autoComplete="off" /></label>
              {process.env.NEXT_PUBLIC_TURNSTILE_SITE_KEY && <TurnstileWidget key={contactTurnstileGeneration} onToken={setTurnstileToken} />}
              <button className="button button-primary form-submit" disabled={contactState.loading} type="submit">{contactState.loading ? <LoaderCircle className="spin" size={17} /> : <Send size={17} />} Send Message</button>
              <StatusMessage error={contactState.error} message={contactState.message} />
              <p className="privacy-note">Your message is only used to reply to you.</p>
            </form>
          </div>
          <div className="glass find-card">
            <p className="eyebrow">Find me</p>
            <div className="social-grid">
              {socialLinks.map((social) => {
                const Icon = social.label === "LinkedIn" ? BriefcaseBusiness : social.label === "GitHub" ? Code2 : Camera;
                return <a className="social-tile" href={social.href} target="_blank" rel="noopener noreferrer" key={social.label}><Icon size={19} /><span><strong>{social.label}</strong><small>{social.description}</small></span></a>;
              })}
              <a className="social-tile" href="#contact"><Mail size={19} /><span><strong>Email</strong><small>Send a private message</small></span></a>
            </div>
          </div>
        </Reveal>

        <Reveal className="glass guestbook-card" delay={0.1}>
          <div className="guestbook-heading"><div><p className="eyebrow">Leave a note</p><h3 className="panel-heading"><MessageCircle /> Guestbook</h3></div></div>
          <form className="form-stack comment-form" onSubmit={submitComment} noValidate>
            <label className="field-label">Name<span className="input-wrap"><UserRound size={17} /><input name="commentName" required minLength={2} maxLength={60} /></span></label>
            <label className="field-label">Comment<span className="input-wrap textarea-wrap"><MessageCircle size={17} /><textarea name="comment" required minLength={2} maxLength={500} rows={3} onChange={(event) => setCommentLength(event.target.value.length)} /></span><small className="character-count">{commentLength}/500</small></label>
            <label className="upload-label"><Paperclip size={16} /> {avatar ? avatar.name : "Choose profile photo (optional)"}<input type="file" accept="image/jpeg,image/png,image/webp" onChange={(event) => {
              const file = event.target.files?.[0] ?? null;
              if (file && file.size > 5 * 1024 * 1024) {
                setCommentState({ loading: false, error: true, message: "Choose an image smaller than 5 MB." });
                event.target.value = "";
                return;
              }
              setAvatar(file);
            }} /></label>
            <small className="privacy-note">JPG, PNG, or WebP · maximum 5 MB. Photos are resized before upload.</small>
            <label className="honeypot" aria-hidden="true">Leave this empty<input name="commentWebsite" tabIndex={-1} autoComplete="off" /></label>
            {process.env.NEXT_PUBLIC_TURNSTILE_SITE_KEY && <TurnstileWidget key={commentTurnstileGeneration} onToken={setCommentTurnstileToken} />}
            <button className="button button-primary form-submit" type="submit" disabled={commentState.loading}>{commentState.loading ? <LoaderCircle className="spin" size={17} /> : <Send size={17} />} Sign Guestbook</button>
            <StatusMessage error={commentState.error} message={commentState.message} />
          </form>
          <div className="comment-list" aria-live="polite">
            {commentsLoading && comments.length === 0 && <><div className="comment-skeleton" /><div className="comment-skeleton" /></>}
            {commentsError && <p className="inline-error" role="status">{commentsError} <button type="button" onClick={() => void loadComments()}>Retry</button></p>}
            {!commentsLoading && !commentsError && comments.length === 0 && <p className="empty-state">No notes yet. Be the first to leave one.</p>}
            {comments.map((comment) => <article className="comment-item" key={comment.id}>
              <span className="comment-avatar">{comment.avatar_url ? <img src={comment.avatar_url} alt="" loading="lazy" decoding="async" /> : comment.name.split(/\s+/).map((part) => part[0]).slice(0, 2).join("").toUpperCase()}</span>
              <div className="comment-bubble"><div className="comment-meta"><strong>{comment.name}</strong><time dateTime={comment.created_at}>{relativeTime(comment.created_at)}</time></div><p>{comment.message}</p></div>
            </article>)}
            {hasMore && <button className="button button-secondary load-more" type="button" disabled={commentsLoading} onClick={() => void loadComments(comments.at(-1)?.created_at)}>Load more</button>}
          </div>
        </Reveal>
      </div>
      <p className="contact-location">{profile.location}</p>
    </section>
  );
}

async function uploadAvatar(file: File, headers: () => Record<string, string>, turnstileToken: string) {
  const bitmap = await createImageBitmap(file);
  const canvas = document.createElement("canvas");
  canvas.width = 256;
  canvas.height = 256;
  const context = canvas.getContext("2d");
  if (!context) throw new Error("This browser cannot resize the selected image.");
  const side = Math.min(bitmap.width, bitmap.height);
  context.drawImage(bitmap, (bitmap.width - side) / 2, (bitmap.height - side) / 2, side, side, 0, 0, 256, 256);
  bitmap.close();
  const image = await new Promise<Blob>((resolve, reject) => canvas.toBlob((blob) => blob ? resolve(blob) : reject(new Error("The selected image could not be prepared.")), "image/webp", 0.82));
  if (image.size > 1024 * 1024) throw new Error("The resized photo is still too large to upload.");
  const auth = headers();
  const response = await fetch(`${supabaseUrl}/functions/v1/avatar-upload`, {
    method: "POST",
    headers: auth,
    body: JSON.stringify({ contentType: image.type, size: image.size, website: "", turnstileToken }),
  });
  const result = await response.json();
  if (!response.ok) throw new Error(result.error ?? "A signed photo upload could not be created.");
  const upload = await fetch(result.uploadUrl, {
    method: "PUT",
    headers: { "Content-Type": image.type, "x-upsert": "false", apikey: supabaseAnonKey ?? "" },
    body: image,
  });
  if (!upload.ok) throw new Error("The photo could not be uploaded. Please try again.");
  return result.avatarPath as string;
}

function StatusMessage({ error, message }: { error: boolean; message: string }) {
  return message ? <p className={error ? "form-status form-status-error" : "form-status"} role="status">{message}</p> : null;
}

function relativeTime(value: string) {
  const seconds = Math.max(0, Math.floor((Date.now() - new Date(value).getTime()) / 1000));
  if (seconds < 60) return "just now";
  if (seconds < 3600) return `${Math.floor(seconds / 60)}m ago`;
  if (seconds < 86400) return `${Math.floor(seconds / 3600)}h ago`;
  return `${Math.floor(seconds / 86400)}d ago`;
}

function TurnstileWidget({ onToken }: { onToken: (token: string) => void }) {
  const widgetRef = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const siteKey = process.env.NEXT_PUBLIC_TURNSTILE_SITE_KEY;
    if (!siteKey || !widgetRef.current) return;
    let widgetId: string | undefined;
    const render = () => {
      if (window.turnstile && widgetRef.current) {
        widgetId = window.turnstile.render(widgetRef.current, { sitekey: siteKey, callback: onToken, "expired-callback": () => onToken("") });
      }
    };
    if (window.turnstile) render();
    else {
      const script = document.createElement("script");
      script.src = "https://challenges.cloudflare.com/turnstile/v0/api.js?render=explicit";
      script.async = true;
      script.onload = render;
      document.head.append(script);
    }
    return () => { if (widgetId && window.turnstile) window.turnstile.remove(widgetId); };
  }, [onToken]);
  return <div ref={widgetRef} className="turnstile-slot" />;
}

declare global {
  interface Window {
    turnstile?: {
      render: (container: HTMLElement, options: Record<string, unknown>) => string;
      remove: (id: string) => void;
    };
  }
}
