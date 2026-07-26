import type { Product } from "@/features/products/services"
import { getDemoUser } from "@/features/auth/demo-auth-service"
import { calculateOrderTotals } from "./order-calculations"
import type { Order, OrderCustomer } from "./types"

type CartItem = Product & { quantity: number }

const getStorageKey = () => {
  const user = getDemoUser()
  if (!user) throw new Error("Please sign in to continue.")
  return `shopella-demo-orders:${user.id}`
}

export const getDemoOrders = (): Order[] => {
  if (typeof window === "undefined") return []

  try {
    const savedOrders = window.localStorage.getItem(getStorageKey())
    return savedOrders ? JSON.parse(savedOrders) as Order[] : []
  } catch {
    return []
  }
}

export const createDemoOrder = (items: CartItem[], customer: OrderCustomer): Order => {
  if (typeof window === "undefined") throw new Error("Demo checkout is only available in the browser.")

  const orderItems = items.map(({ id, title, price, discountPercentage, quantity }) => ({
    id, title, price, discountPercentage, quantity,
  }))
  const order: Order = {
    id: `demo-order-${Date.now()}`,
    createdAt: new Date().toISOString(),
    customer,
    items: orderItems,
    totals: calculateOrderTotals(orderItems),
  }

  const storageKey = getStorageKey()
  const orders = [order, ...getDemoOrders()]
  window.localStorage.setItem(storageKey, JSON.stringify(orders))
  return order
}
