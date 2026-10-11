import { createClient } from "@supabase/supabase-js";

export function corsHeaders(origin: string | null) {
  const allowedOrigin = Deno.env.get("SITE_URL")?.replace(/\/$/, "");
  const headers: Record<string, string> = {
    "Access-Control-Allow-Headers": "authorization, apikey, content-type, x-client-info",
    "Access-Control-Allow-Methods": "GET, POST, OPTIONS",
    "Cache-Control": "no-store",
    "Content-Type": "application/json",
    "Vary": "Origin",
    "X-Content-Type-Options": "nosniff",
    "Referrer-Policy": "strict-origin-when-cross-origin",
  };
  if (allowedOrigin && origin?.replace(/\/$/, "") === allowedOrigin) {
    headers["Access-Control-Allow-Origin"] = allowedOrigin;
  }
  return headers;
}

export function jsonResponse(
  body: unknown,
  status: number,
  origin: string | null,
) {
  return new Response(JSON.stringify(body), {
    status,
    headers: corsHeaders(origin),
  });
}

export function optionsResponse(request: Request) {
  const origin = request.headers.get("origin");
  const headers = corsHeaders(origin);
  if (!headers["Access-Control-Allow-Origin"]) {
    return new Response(null, { status: 403, headers });
  }
  return new Response(null, { status: 204, headers });
}

export function requestOriginAllowed(request: Request) {
  const origin = request.headers.get("origin");
  const allowedOrigin = Deno.env.get("SITE_URL")?.replace(/\/$/, "");
  return Boolean(allowedOrigin && origin?.replace(/\/$/, "") === allowedOrigin);
}

export function supabaseAdmin() {
  const url = Deno.env.get("SUPABASE_URL");
  const serviceRoleKey = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY");
  if (!url || !serviceRoleKey) {
    throw new Error("Supabase server configuration is incomplete.");
  }
  return createClient(url, serviceRoleKey, {
    auth: { autoRefreshToken: false, persistSession: false },
  });
}

export function clientAddress(request: Request) {
  return (
    request.headers.get("cf-connecting-ip") ??
    request.headers.get("x-real-ip") ??
    request.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ??
    "unknown"
  );
}

export async function hashAddress(request: Request) {
  const salt = Deno.env.get("SERVER_SALT");
  if (!salt || salt.length < 32) {
    throw new Error("SERVER_SALT must be configured with at least 32 characters.");
  }
  const encoded = new TextEncoder().encode(`${clientAddress(request)}${salt}`);
  const digest = await crypto.subtle.digest("SHA-256", encoded);
  return Array.from(new Uint8Array(digest), (value) =>
    value.toString(16).padStart(2, "0"),
  ).join("");
}

export async function claimRateSlot(
  action: "contact" | "comment" | "avatar",
  ipHash: string,
  limit: number,
) {
  const { data, error } = await supabaseAdmin().rpc("claim_rate_slot", {
    p_action: action,
    p_ip_hash: ipHash,
    p_limit: limit,
    p_window_seconds: 600,
  });
  if (error) {
    console.error("Rate-limit storage failed:", error.message);
    throw new Error("The request protection service is temporarily unavailable.");
  }
  if (data !== true) {
    return false;
  }
  return true;
}

export async function checkTurnstile(token: unknown, request: Request) {
  const secret = Deno.env.get("TURNSTILE_SECRET_KEY");
  if (!secret) return true;
  if (typeof token !== "string" || !token) return false;
  const form = new URLSearchParams({
    secret,
    response: token,
    remoteip: clientAddress(request),
  });
  const response = await fetch("https://challenges.cloudflare.com/turnstile/v0/siteverify", {
    method: "POST",
    headers: { "Content-Type": "application/x-www-form-urlencoded" },
    body: form,
  });
  if (!response.ok) {
    console.error("Turnstile verification endpoint returned:", response.status);
    return false;
  }
  const result = await response.json();
  return result.success === true;
}

export function originIsValid(request: Request) {
  if (requestOriginAllowed(request)) return true;
  const origin = request.headers.get("origin");
  const allowed = Deno.env.get("SITE_URL");
  console.warn("Rejected request from disallowed origin:", origin ?? "missing");
  if (!allowed) throw new Error("SITE_URL is not configured.");
  return false;
}
