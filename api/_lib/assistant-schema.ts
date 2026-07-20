import { z } from "zod"

const userTextPartSchema = z.object({ type: z.literal("text"), text: z.string().trim().min(1).max(800) }).passthrough()
const assistantTextPartSchema = z.object({ type: z.literal("text"), text: z.string().trim().min(1).max(4000) }).passthrough()
const otherPartSchema = z.object({
  type: z.string().refine((type) => type !== "text", "Text parts use the protected text schema."),
}).passthrough()

export const assistantRequestSchema = z.object({
  messages: z.array(z.discriminatedUnion("role", [z.object({
    id: z.string().min(1),
    role: z.literal("user"),
    parts: z.array(z.union([userTextPartSchema, otherPartSchema])).min(1),
  }).passthrough(), z.object({
    id: z.string().min(1),
    role: z.literal("assistant"),
    parts: z.array(z.union([assistantTextPartSchema, otherPartSchema])).min(1),
  }).passthrough()])).min(1).max(50),
})
