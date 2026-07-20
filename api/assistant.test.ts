import { describe, expect, it } from "vitest"
import { assistantRequestSchema } from "./_lib/assistant-schema"
import { buildAssistantSystemPrompt } from "./_lib/assistant-prompt"

describe("assistant protection", () => {
  it("limits user message text to 800 characters", () => {
    const payload = { messages: [{ id: "1", role: "user", parts: [{ type: "text", text: "a".repeat(801) }] }] }
    expect(assistantRequestSchema.safeParse(payload).success).toBe(false)
  })


  it("allows longer assistant messages as context", () => {
    const payload = { messages: [{ id: "1", role: "assistant", parts: [{ type: "text", text: "a".repeat(2000) }] }] }
    expect(assistantRequestSchema.safeParse(payload).success).toBe(true)
  })
  it("grounds advice in the current catalogue and forbids purchases", () => {
    const prompt = buildAssistantSystemPrompt([{ id: 1, title: "Cleanser", brand: "Demo", category: "beauty", price: 12, discountPercentage: 0, rating: 4.5, stock: 3, thumbnail: "", images: [], description: "" }])
    expect(prompt).toContain("Cleanser | Demo | beauty | $12")
    expect(prompt).toContain("never claim to buy")
  })
})
