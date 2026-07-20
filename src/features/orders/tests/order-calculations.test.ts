import { describe, expect, it } from "vitest"
import { calculateOrderTotals, getDiscountedUnitPrice } from "../order-calculations"

describe("order calculations", () => {
  it("uses discounted prices and one shared shipping rule", () => {
    expect(getDiscountedUnitPrice(100, 10)).toBe(90)
    expect(calculateOrderTotals([{ price: 100, discountPercentage: 10, quantity: 2 }])).toEqual({ subtotal: 180, shipping: 4.99, total: 184.99 })
  })

  it("does not charge shipping for an empty cart", () => {
    expect(calculateOrderTotals([])).toEqual({ subtotal: 0, shipping: 0, total: 0 })
  })
})
