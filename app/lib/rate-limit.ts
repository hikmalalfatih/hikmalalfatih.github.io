export function exceedsRateLimit(count: number, limit: number): boolean {
  return count >= limit;
}

export async function hashClientAddress(
  address: string,
  salt: string,
): Promise<string> {
  const bytes = new TextEncoder().encode(`${address}${salt}`);
  const digest = await crypto.subtle.digest("SHA-256", bytes);
  return Array.from(new Uint8Array(digest), (byte) =>
    byte.toString(16).padStart(2, "0"),
  ).join("");
}
