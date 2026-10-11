import { commentSchema } from "../_shared/schemas.ts";
import {
  claimRateSlot,
  checkTurnstile,
  hashAddress,
  jsonResponse,
  optionsResponse,
  originIsValid,
  supabaseAdmin,
} from "../_shared/http.ts";

const blockedWords = /\b(?:fuck(?:er|ing)?|shit(?:ty)?|bitch(?:es)?|asshole|motherfucker|kontol|memek|ngentot)\b/i;

Deno.serve(async (request) => {
  const origin = request.headers.get("origin");
  if (request.method === "OPTIONS") return optionsResponse(request);
  if (!["GET", "POST"].includes(request.method)) return jsonResponse({ error: "Method not allowed." }, 405, origin);

  try {
    if (!originIsValid(request)) return jsonResponse({ error: "Origin is not allowed." }, 403, origin);
    const admin = supabaseAdmin();
    if (request.method === "GET") {
      const url = new URL(request.url);
      const requestedLimit = Number(url.searchParams.get("limit") ?? 20);
      const limit = Number.isInteger(requestedLimit) ? Math.min(50, Math.max(1, requestedLimit)) : 20;
      const before = url.searchParams.get("before");
      if (before && Number.isNaN(Date.parse(before))) {
        return jsonResponse({ error: "The before cursor must be a valid ISO date." }, 400, origin);
      }
      let query = admin
        .from("comments")
        .select("id,name,message,avatar_path,created_at")
        .eq("is_visible", true)
        .order("created_at", { ascending: false })
        .limit(limit + 1);
      if (before) query = query.lt("created_at", before);
      const { data, error } = await query;
      if (error) {
        console.error("Guestbook could not be loaded:", error.message);
        return jsonResponse({ error: "Comments could not be loaded right now." }, 500, origin);
      }
      const rows = data ?? [];
      const hasMore = rows.length > limit;
      const visibleRows = rows.slice(0, limit);
      const comments = await Promise.all(visibleRows.map(async (comment) => {
        let avatarUrl: string | null = null;
        if (comment.avatar_path) {
          const { data: publicAvatar } = admin.storage.from("avatars").getPublicUrl(comment.avatar_path);
          avatarUrl = publicAvatar.publicUrl;
        }
        return {
          id: comment.id,
          name: comment.name,
          message: comment.message,
          avatar_url: avatarUrl,
          created_at: comment.created_at,
        };
      }));
      return new Response(JSON.stringify({ comments, hasMore }), {
        status: 200,
        headers: {
          "Access-Control-Allow-Origin": Deno.env.get("SITE_URL") ?? "",
          "Access-Control-Allow-Headers": "authorization, apikey, content-type, x-client-info",
          "Cache-Control": "public, max-age=30, s-maxage=30, stale-while-revalidate=60",
          "Content-Type": "application/json",
          "Vary": "Origin",
          "X-Content-Type-Options": "nosniff",
          "Referrer-Policy": "strict-origin-when-cross-origin",
        },
      });
    }

    let raw: unknown;
    try {
      raw = await request.json();
    } catch {
      return jsonResponse({ error: "Request body must be valid JSON." }, 400, origin);
    }
    const parsed = commentSchema.safeParse(raw);
    if (!parsed.success) return jsonResponse({ error: parsed.error.issues[0]?.message ?? "Please check your comment." }, 400, origin);
    const body = parsed.data;
    if (body.website || Date.now() - body.startedAt < 3000) {
      return jsonResponse({ ok: true }, 200, origin);
    }
    const cleanName = body.name.replace(/<[^>]*>/g, "").trim();
    const cleanMessage = body.message.replace(/<[^>]*>/g, "").trim();
    if (blockedWords.test(cleanName) || blockedWords.test(cleanMessage)) {
      return jsonResponse({ error: "Please keep guestbook messages respectful." }, 400, origin);
    }
    if (/(.)\1{11,}|(?:https?:\/\/\S+\s*){3,}/i.test(cleanMessage)) {
      return jsonResponse({ error: "This comment looks like spam. Please revise it and try again." }, 400, origin);
    }
    if (!await checkTurnstile(body.turnstileToken, request)) {
      return jsonResponse({ error: "Bot verification failed. Please try again." }, 400, origin);
    }
    const ipHash = await hashAddress(request);
    if (!await claimRateSlot("comment", ipHash, 5)) {
      return jsonResponse({ error: "Too many comments from this connection. Please try again in a few minutes." }, 429, origin);
    }
    if (body.avatarPath) {
      const { data: avatar } = await admin.storage.from("avatars").list("", { search: body.avatarPath.replace(/^avatars\//, "") });
      const expectedName = body.avatarPath.replace(/^avatars\//, "");
      if (!avatar?.some((item) => item.name === expectedName)) {
        return jsonResponse({ error: "The uploaded photo could not be verified." }, 400, origin);
      }
    }
    const { error } = await admin.from("comments").insert({
      name: cleanName,
      message: cleanMessage,
      avatar_path: body.avatarPath?.replace(/^avatars\//, ""),
      ip_hash: ipHash,
      is_visible: true,
    });
    if (error) {
      console.error("Guestbook message could not be stored:", error.message);
      return jsonResponse({ error: "Your comment could not be saved. Please try again." }, 500, origin);
    }
    return jsonResponse({ ok: true }, 201, origin);
  } catch (error) {
    console.error("Comments function failed:", error instanceof Error ? error.message : "Unknown error");
    return jsonResponse({ error: error instanceof Error ? error.message : "The guestbook service is temporarily unavailable." }, 500, origin);
  }
});
