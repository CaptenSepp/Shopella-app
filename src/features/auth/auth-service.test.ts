import { describe, expect, it } from "vitest"
import { mapSupabaseUser } from "./auth-service"

describe("Supabase user mapping", () => {
  it("copies only the safe user fields used by Shopella", () => {
    const user = mapSupabaseUser({ id: "user-1", email: "ada@example.com", user_metadata: { name: "Ada", secret: "hidden" } } as never)
    expect(user).toEqual({ id: "user-1", email: "ada@example.com", name: "Ada" })
  })
})
