import { z } from "zod"

const textPartSchema = z.object({ type: z.literal("text"), text: z.string().trim().min(1).max(800) }).passthrough()
const otherPartSchema = z.object({
  type: z.string().refine((type) => type !== "text", "Text parts use the protected text schema."),
}).passthrough()

export const assistantRequestSchema = z.object({
  messages: z.array(z.object({
    id: z.string().min(1),
    role: z.enum(["user", "assistant"]),
    parts: z.array(z.union([textPartSchema, otherPartSchema])).min(1),
  }).passthrough()).min(1).max(50),
})
