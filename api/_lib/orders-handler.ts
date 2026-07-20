import type { Order } from "../../src/features/orders/types"
import { calculateOrderTotals } from "../../src/features/orders/order-calculations"
import type { ApiRequest, ApiResponse } from "./http.js"
import { readRequestBody, sendJson } from "./http.js"
import { createOrderRequestSchema } from "./order-schema.js"
import { authenticateRequest } from "./supabase-server.js"
import { getCatalogProduct } from "./product-catalog.js"

type OrderRow = {
  id: string
  created_at: string
  customer_name: string
  customer_email: string
  shipping_address: string
  items: Order["items"]
  subtotal: number | string
  shipping: number | string
  total: number | string
}

const toOrder = (row: OrderRow): Order => ({
  id: row.id,
  createdAt: row.created_at,
  customer: { name: row.customer_name, email: row.customer_email, address: row.shipping_address },
  items: row.items,
  totals: { subtotal: Number(row.subtotal), shipping: Number(row.shipping), total: Number(row.total) },
})

export const handleOrdersRequest = async (request: ApiRequest, response: ApiResponse) => {
  try {
    const { supabase, user } = await authenticateRequest(request)

    if (request.method === "GET") {
      const result = await supabase.from("orders").select("*").eq("user_id", user.id).order("created_at", { ascending: false })
      if (result.error) throw result.error
      return sendJson(response, 200, (result.data as OrderRow[]).map(toOrder))
    }

    if (request.method === "POST") {
      const input = createOrderRequestSchema.parse(await readRequestBody(request))
      const products = await Promise.all(input.items.map((item) => getCatalogProduct(item.id)))
      const items = input.items.map((item, index) => {
        const product = products[index]
        if (!product || item.quantity > product.stock) throw new Error(`${product?.title ?? "Product"} does not have enough stock.`)
        return { id: product.id, title: product.title, price: product.price, discountPercentage: product.discountPercentage, quantity: item.quantity }
      })
      const totals = calculateOrderTotals(items)

      // Only server-verified product values and the authenticated email are saved.
      const insertResult = await supabase.from("orders").insert({
        user_id: user.id,
        customer_name: input.customer.name,
        customer_email: user.email,
        shipping_address: input.customer.address,
        items,
        subtotal: totals.subtotal,
        shipping: totals.shipping,
        total: totals.total,
      }).select("*").single()
      if (insertResult.error) throw insertResult.error
      return sendJson(response, 201, toOrder(insertResult.data as OrderRow))
    }

    response.setHeader("Allow", "GET, POST")
    return sendJson(response, 405, { message: "Method not allowed." })
  } catch (error) {
    const message = error instanceof Error ? error.message : "Unexpected server error."
    const status = message.includes("sign in") || message.includes("session") ? 401 : message.includes("environment") ? 503 : 400
    return sendJson(response, status, { message })
  }
}
