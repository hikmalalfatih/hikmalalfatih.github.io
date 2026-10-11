import { z } from "zod";

const trimmedName = z.string().trim().min(2).max(60);
const noMoreThanTwoLinks = (value: string) =>
  (value.match(/https?:\/\/|www\./gi) ?? []).length <= 2;

export const contactSchema = z.object({
  name: trimmedName,
  email: z.string().trim().email().max(254),
  message: z.string().trim().min(10).max(2000).refine(noMoreThanTwoLinks),
  website: z.string().max(200).optional().default(""),
  startedAt: z.number().int().nonnegative(),
  turnstileToken: z.string().max(4096).optional(),
});

export const commentSchema = z.object({
  name: trimmedName,
  message: z.string().trim().min(2).max(500).refine(noMoreThanTwoLinks),
  avatarPath: z.string().regex(/^avatars\/[0-9a-f-]+\.webp$/i).optional(),
  website: z.string().max(200).optional().default(""),
  startedAt: z.number().int().nonnegative(),
  turnstileToken: z.string().max(4096).optional(),
});

export const avatarSchema = z.object({
  contentType: z.enum(["image/jpeg", "image/png", "image/webp"]),
  size: z.number().int().positive().max(5 * 1024 * 1024),
  website: z.string().max(200).optional().default(""),
  turnstileToken: z.string().max(4096).optional(),
});

export type ContactPayload = z.infer<typeof contactSchema>;
export type CommentPayload = z.infer<typeof commentSchema>;
export type AvatarPayload = z.infer<typeof avatarSchema>;
