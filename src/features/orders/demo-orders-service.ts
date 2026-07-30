import type { Product } from "@/features/products/services"
import { getDemoUser } from "@/features/auth/demo-auth-service"
import { calculateOrderTotals } from "./order-calculations"
import type { Order, OrderCustomer, OrderStatus } from "./types"

type CartItem = Product & { quantity: number }

const getStorageKey = () => {
  // Separate each demo user's order history in local storage.
  const user = getDemoUser()
  if (!user) throw new Error("Please sign in to continue.")
  return `shopella-demo-orders:${user.id}`
}

export const getDemoOrders = (): Order[] => {
  // Invalid or missing browser data is treated as an empty history.
  if (typeof window === "undefined") return []

  try {
    const savedOrders = window.localStorage.getItem(getStorageKey())
    return savedOrders ? JSON.parse(savedOrders) as Order[] : []
  } catch {
    return []
  }
}

export const createDemoOrder = (items: CartItem[], customer: OrderCustomer): Order => {
  // Build the same order shape returned by the production API.
  if (typeof window === "undefined") throw new Error("Demo checkout is only available in the browser.")

  const orderItems = items.map(({ id, title, price, discountPercentage, quantity }) => ({
    id, title, price, discountPercentage, quantity,
  }))
  const createdAt = new Date().toISOString()
  const order: Order = {
    id: `demo-order-${Date.now()}`,
    createdAt,
    customer,
    items: orderItems,
    totals: calculateOrderTotals(orderItems),
    status: "pending",
    statusHistory: [{ id: crypto.randomUUID(), status: "pending", createdAt, note: "Order created" }],
  }

  const storageKey = getStorageKey()
  const orders = [order, ...getDemoOrders()]
  window.localStorage.setItem(storageKey, JSON.stringify(orders))
  return order
}

export const updateDemoOrderStatus = (orderId: string, status: OrderStatus): Order => {
  // Status changes append history instead of overwriting the prior lifecycle.
  const orders = getDemoOrders()
  const index = orders.findIndex((order) => order.id === orderId)
  if (index < 0) throw new Error("Demo order was not found.")

  const createdAt = new Date().toISOString()
  const current = orders[index]
  const updated: Order = {
    ...current,
    status,
    statusHistory: [...(current.statusHistory ?? []), {
      id: crypto.randomUUID(),
      status,
      createdAt,
      note: status === "paid" ? "Demo payment approved" : `Order marked ${status}`,
    }],
    receipt: status === "paid" || current.receipt
      ? current.receipt ?? { number: `DEMO-${current.id.slice(-8).toUpperCase()}` }
      : undefined,
  }
  orders[index] = updated
  window.localStorage.setItem(getStorageKey(), JSON.stringify(orders))
  return updated
}
