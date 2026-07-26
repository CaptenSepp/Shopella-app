import { afterEach, describe, expect, it, vi } from "vitest"
import { createOrder, getOrders } from "../services"
import type { Product } from "@/features/products/services"

vi.mock("@/features/auth/auth-service", () => ({ getAccessToken: vi.fn().mockResolvedValue("test-token") }))
vi.mock("@/features/auth/supabase-client", () => ({ isSupabaseConfigured: true }))

const buildItem = (overrides?: Partial<Product & { quantity: number }>) => ({
  id: 1, title: "Phone", description: "Phone description", price: 99,
  discountPercentage: 10, rating: 4, stock: 10, brand: "Brand",
  category: "phones", thumbnail: "", images: [], quantity: 2, ...overrides,
})

afterEach(() => vi.unstubAllGlobals())

describe("orders services", () => {
  it("sends only trusted order input with the access token", async () => {
    const fetchMock = vi.fn().mockResolvedValue({ ok: true, json: async () => ({ id: "order_1" }) })
    vi.stubGlobal("fetch", fetchMock)

    await createOrder([buildItem()], { name: "Ada", email: "ada@example.com", address: "123 Long Street" })

    expect(fetchMock).toHaveBeenCalledWith("/api/orders", expect.objectContaining({
      method: "POST",
      headers: { "Content-Type": "application/json", Authorization: "Bearer test-token" },
      body: JSON.stringify({ items: [{ id: 1, quantity: 2 }], customer: { name: "Ada", address: "123 Long Street" } }),
    }))
  })

  it("loads the signed-in user's private orders", async () => {
    const fetchMock = vi.fn().mockResolvedValue({ ok: true, json: async () => ([{ id: "order_2" }]) })
    vi.stubGlobal("fetch", fetchMock)

    expect(await getOrders()).toEqual([{ id: "order_2" }])
    expect(fetchMock).toHaveBeenCalledWith("/api/orders", { headers: { Authorization: "Bearer test-token" } })
  })

  it("shows the useful API error message", async () => {
    vi.stubGlobal("fetch", vi.fn().mockResolvedValue({ ok: false, json: async () => ({ message: "Stock changed." }) }))
    await expect(createOrder([buildItem()], { name: "Ada", email: "ada@example.com", address: "123 Long Street" })).rejects.toThrow("Stock changed.")
  })
})
