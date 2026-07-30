import type { Order, OrderStatusEntry } from "../../src/features/orders/types"
import { calculateOrderTotals } from "../../src/features/orders/order-calculations"
import type { ApiRequest, ApiResponse } from "./http"
import { readRequestBody, sendJson } from "./http"
import { createOrderRequestSchema } from "./order-schema"
import { authenticateRequest } from "./supabase-server"
import { getCatalogProduct } from "./product-catalog"

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
  status?: Order["status"]
  receipt_number?: string | null
  receipt_url?: string | null
  order_status_history?: Array<{ id: string; status: Order["status"]; created_at: string; note?: string }>
}

const toOrder = (row: OrderRow): Order => ({
  // Convert database snake_case columns into the client-facing order contract.
  id: row.id,
  createdAt: row.created_at,
  customer: { name: row.customer_name, email: row.customer_email, address: row.shipping_address },
  items: row.items,
  totals: { subtotal: Number(row.subtotal), shipping: Number(row.shipping), total: Number(row.total) },
  status: row.status ?? "pending",
  statusHistory: (row.order_status_history ?? []).map((entry): OrderStatusEntry => ({
    id: entry.id, status: entry.status, createdAt: entry.created_at, note: entry.note,
  })),
  receipt: row.receipt_number ? { number: row.receipt_number, url: row.receipt_url ?? undefined } : undefined,
})

export const handleOrdersRequest = async (request: ApiRequest, response: ApiResponse) => {
  // This framework-neutral handler is shared by the Vercel and Next.js endpoints.
  try {
    const { supabase, user } = await authenticateRequest(request)

  if (request.method === "GET") {
    // Customers receive only orders owned by their authenticated user id.
      const result = await supabase.from("orders").select("*, order_status_history(*)").eq("user_id", user.id).order("created_at", { ascending: false })
      if (result.error) throw result.error
      return sendJson(response, 200, (result.data as OrderRow[]).map(toOrder))
    }

  if (request.method === "POST") {
    // Validate and price the submitted cart on the server before inserting it.
      const input = createOrderRequestSchema.parse(await readRequestBody(request))
      const products = await Promise.all(input.items.map((item) => getCatalogProduct(item.id)))
      const items = input.items.map((item, index) => {
        const product = products[index]
        if (!product || item.quantity > product.stock) throw new Error(`${product?.title ?? "Product"} does not have enough stock.`)
        return { id: product.id, title: product.title, price: product.price, discountPercentage: product.discountPercentage, quantity: item.quantity }
      })
      const totals = calculateOrderTotals(items)

      // Only server-verified product values and the authenticated email are saved.
      const insertResult = await supabase.rpc("create_pending_order", {
        order_user_id: user.id,
        order_customer_name: input.customer.name,
        order_customer_email: user.email,
        order_shipping_address: input.customer.address,
        order_items: items.map((item, index) => ({ ...item, availableStock: products[index]?.stock ?? 0 })),
        order_subtotal: totals.subtotal,
        order_shipping: totals.shipping,
        order_total: totals.total,
      })
      if (insertResult.error) throw insertResult.error
      const created = await supabase.from("orders").select("*, order_status_history(*)").eq("id", insertResult.data).single()
      if (created.error) throw created.error
      return sendJson(response, 201, toOrder(created.data as OrderRow))
    }

    response.setHeader("Allow", "GET, POST")
    return sendJson(response, 405, { message: "Method not allowed." })
  } catch (error) {
    const message = error instanceof Error ? error.message : "Unexpected server error."
    const status = message.includes("sign in") || message.includes("session") ? 401 : message.includes("environment") ? 503 : 400
    return sendJson(response, status, { message })
  }
}
