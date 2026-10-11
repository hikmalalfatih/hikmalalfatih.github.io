import { avatarSchema } from "../_shared/schemas.ts";
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
    const parsed = avatarSchema.safeParse(raw);
    if (!parsed.success) return jsonResponse({ error: parsed.error.issues[0]?.message ?? "Invalid image upload." }, 400, origin);
    if (parsed.data.website) return jsonResponse({ ok: true }, 200, origin);
    if (!await checkTurnstile(parsed.data.turnstileToken, request)) {
      return jsonResponse({ error: "Bot verification failed. Please try again." }, 400, origin);
    }
    if (parsed.data.contentType !== "image/webp" || parsed.data.size > 1024 * 1024) {
      return jsonResponse({ error: "Upload a resized WebP image no larger than 1 MB." }, 400, origin);
    }
    const ipHash = await hashAddress(request);
    if (!await claimRateSlot("avatar", ipHash, 5)) {
      return jsonResponse({ error: "Too many photo uploads from this connection. Please try again later." }, 429, origin);
    }
    const path = `${crypto.randomUUID()}.webp`;
    const { data, error } = await supabaseAdmin().storage.from("avatars").createSignedUploadUrl(path, { upsert: false });
    if (error || !data) {
      console.error("Signed avatar upload URL could not be created:", error?.message ?? "No URL returned.");
      return jsonResponse({ error: "The photo upload service is temporarily unavailable." }, 503, origin);
    }
    const baseUrl = Deno.env.get("SUPABASE_URL")?.replace(/\/$/, "");
    if (!baseUrl) throw new Error("SUPABASE_URL is not configured.");
    return jsonResponse({
      uploadUrl: `${baseUrl}/storage/v1${data.signedUrl}`,
      avatarPath: `avatars/${path}`,
      token: data.token,
    }, 200, origin);
  } catch (error) {
    console.error("Avatar upload function failed:", error instanceof Error ? error.message : "Unknown error");
    return jsonResponse({ error: error instanceof Error ? error.message : "The photo upload service is temporarily unavailable." }, 500, origin);
  }
});
