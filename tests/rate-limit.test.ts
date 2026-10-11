import assert from "node:assert/strict";
import test from "node:test";
import { exceedsRateLimit, hashClientAddress } from "../app/lib/rate-limit";

test("rate-limit helper blocks at the configured count", () => {
  assert.equal(exceedsRateLimit(2, 3), false);
  assert.equal(exceedsRateLimit(3, 3), true);
  assert.equal(exceedsRateLimit(4, 3), true);
});

test("address hashes are stable, salted, and do not expose the address", async () => {
  const address = "203.0.113.50";
  const first = await hashClientAddress(address, "a sufficiently long server salt");
  assert.equal(first, await hashClientAddress(address, "a sufficiently long server salt"));
  assert.notEqual(first, await hashClientAddress(address, "a different server salt"));
  assert.match(first, /^[a-f0-9]{64}$/);
  assert.equal(first.includes(address), false);
});
