export type OrderItem = { // stored order line item
  id: number
  title: string
  price: number
  discountPercentage?: number
  quantity: number
}

export type OrderCustomer = { // customer details captured at checkout
  name: string
  email: string
  address: string
}

export type OrderTotals = { // order totals snapshot
  subtotal: number
  shipping: number
  total: number
}

export const ORDER_STATUSES = ["pending", "paid", "processing", "shipped", "cancelled", "refunded"] as const
export type OrderStatus = typeof ORDER_STATUSES[number]

export type OrderStatusEntry = {
  id: string
  status: OrderStatus
  createdAt: string
  note?: string
}

export type OrderReceipt = {
  number: string
  url?: string
}

export type Order = { // persisted order shape
  id: string
  createdAt: string
  customer: OrderCustomer
  items: OrderItem[]
  totals: OrderTotals
  status: OrderStatus
  statusHistory: OrderStatusEntry[]
  receipt?: OrderReceipt
}
