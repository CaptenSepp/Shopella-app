import { describe, expect, it } from "vitest"
import { createOrderRequestSchema } from "./_lib/order-schema"

describe("order request schema", () => {
  it("accepts only product ids, quantities, and delivery details", () => {
    const result = createOrderRequestSchema.parse({
      items: [{ id: 7, quantity: 2, price: 1 }],
      customer: { name: "Ada", address: "123 Long Street", email: "ignored@example.com" },
    })

    // Zod removes extra browser values, so prices and email cannot be trusted accidentally.
    expect(result).toEqual({ items: [{ id: 7, quantity: 2 }], customer: { name: "Ada", address: "123 Long Street" } })
  })

  it.each([
    { items: [], customer: { name: "Ada", address: "123 Long Street" } },
    { items: [{ id: 1, quantity: 0 }], customer: { name: "Ada", address: "123 Long Street" } },
    { items: [{ id: 1, quantity: 1 }], customer: { name: "A", address: "short" } },
  ])("rejects unsafe order input", (payload) => {
    expect(createOrderRequestSchema.safeParse(payload).success).toBe(false)
  })
})
