import { Resend } from "resend";
import { contactSchema } from "../_shared/schemas.ts";
import {
  claimRateSlot,
  checkTurnstile,
  hashAddress,
  jsonResponse,
  optionsResponse,
  originIsValid,
  supabaseAdmin,
} from "../_shared/http.ts";

Deno.serve(async (request) => {
  const origin = request.headers.get("origin");
  if (request.method === "OPTIONS") return optionsResponse(request);
  if (request.method !== "POST") return jsonResponse({ error: "Method not allowed." }, 405, origin);

  try {
    if (!originIsValid(request)) return jsonResponse({ error: "Origin is not allowed." }, 403, origin);
    let raw: unknown;
    try {
      raw = await request.json();
    } catch {
      return jsonResponse({ error: "Request body must be valid JSON." }, 400, origin);
    }
    const parsed = contactSchema.safeParse(raw);
    if (!parsed.success) return jsonResponse({ error: parsed.error.issues[0]?.message ?? "Please check the form fields." }, 400, origin);
    const body = parsed.data;
    if (body.website || Date.now() - body.startedAt < 3000) {
      return jsonResponse({ ok: true }, 200, origin);
    }
    if (!await checkTurnstile(body.turnstileToken, request)) {
      return jsonResponse({ error: "Bot verification failed. Please try again." }, 400, origin);
    }

    const ipHash = await hashAddress(request);
    if (!await claimRateSlot("contact", ipHash, 3)) {
      return jsonResponse({ error: "Too many messages from this connection. Please try again in a few minutes." }, 429, origin);
    }
    const admin = supabaseAdmin();
    const userAgent = request.headers.get("user-agent")?.slice(0, 500) ?? "";
    const { error: insertError } = await admin.from("contact_messages").insert({
      name: body.name,
      email: body.email,
      message: body.message,
      ip_hash: ipHash,
      user_agent: userAgent,
    });
    if (insertError) {
      console.error("Contact message could not be stored:", insertError.message);
      return jsonResponse({ error: "Your message could not be saved. Please try again later." }, 500, origin);
    }

    const apiKey = Deno.env.get("RESEND_API_KEY");
    const recipient = Deno.env.get("CONTACT_TO_EMAIL");
    if (!apiKey || !recipient) {
      console.error("Resend or contact recipient is not configured.");
      return jsonResponse({ error: "Your message was saved, but email delivery is not configured yet." }, 503, origin);
    }
    const resend = new Resend(apiKey);
    const escapeHtml = (value: string) =>
      value.replace(/[&<>"']/g, (character) => ({
        "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;",
      })[character] ?? character);
    const { error: mailError } = await resend.emails.send({
      from: Deno.env.get("CONTACT_FROM_EMAIL") || "onboarding@resend.dev",
      to: recipient,
      replyTo: body.email,
      subject: `Portfolio message from ${body.name}`,
      text: `Name: ${body.name}\nEmail: ${body.email}\n\n${body.message}`,
      html: `<h2>Portfolio contact</h2><p><strong>Name:</strong> ${escapeHtml(body.name)}</p><p><strong>Reply to:</strong> ${escapeHtml(body.email)}</p><pre style="white-space:pre-wrap;font:inherit">${escapeHtml(body.message)}</pre>`,
    });
    if (mailError) {
      console.error("Resend rejected portfolio message:", mailError.message);
      return jsonResponse({ error: "Your message was saved, but the email notification could not be delivered. Please contact me again later if you do not hear back." }, 502, origin);
    }
    return jsonResponse({ ok: true }, 200, origin);
  } catch (error) {
    console.error("Contact function failed:", error instanceof Error ? error.message : "Unknown error");
    return jsonResponse({ error: error instanceof Error ? error.message : "The message service is temporarily unavailable." }, 500, origin);
  }
});
