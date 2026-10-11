import assert from "node:assert/strict";
import test from "node:test";
import { avatarSchema, commentSchema, contactSchema } from "../app/lib/schemas";

test("contact schema accepts normal message and permits at most two links", () => {
  const base = {
    name: "Hikmal Recruiter",
    email: "recruiter@example.com",
    message: "I would like to discuss a role with you.",
    website: "",
    startedAt: Date.now() - 4000,
  };
  assert.equal(contactSchema.safeParse(base).success, true);
  assert.equal(contactSchema.safeParse({ ...base, message: "Visit https://one.test and https://two.test for details." }).success, true);
  assert.equal(contactSchema.safeParse({ ...base, message: "https://one.test https://two.test https://three.test" }).success, false);
});

test("contact schema rejects invalid email and out-of-range messages", () => {
  const base = { name: "Valid Name", email: "invalid", message: "Too short", startedAt: Date.now() };
  assert.equal(contactSchema.safeParse(base).success, false);
  assert.equal(contactSchema.safeParse({ ...base, email: "valid@example.com", message: "A".repeat(2001) }).success, false);
});

test("guestbook schema bounds names, comments, and avatar paths", () => {
  const validComment = { name: "Guest User", message: "Nice portfolio!", website: "", startedAt: Date.now() - 4000 };
  assert.equal(commentSchema.safeParse(validComment).success, true);
  assert.equal(commentSchema.safeParse({ name: "Guest User", message: "Missing timer" }).success, false);
  assert.equal(commentSchema.safeParse({ name: "X", message: "Hello" }).success, false);
  assert.equal(commentSchema.safeParse({ name: "Guest User", message: "Hello", avatarPath: "../private.png" }).success, false);
  assert.equal(commentSchema.safeParse({ name: "Guest User", message: "x".repeat(501) }).success, false);
});

test("avatar upload only accepts supported declared image types up to 5 MB", () => {
  assert.equal(avatarSchema.safeParse({ contentType: "image/webp", size: 1000 }).success, true);
  assert.equal(avatarSchema.safeParse({ contentType: "image/svg+xml", size: 1000 }).success, false);
  assert.equal(avatarSchema.safeParse({ contentType: "image/png", size: 5 * 1024 * 1024 + 1 }).success, false);
});
