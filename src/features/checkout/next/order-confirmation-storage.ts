import type { Order } from "@/features/orders/types"

const ORDER_STORAGE_KEY = "checkout-confirmation-order"

export const saveConfirmationOrder = (order: Order) => {
  if (typeof window === "undefined") return
  window.sessionStorage.setItem(ORDER_STORAGE_KEY, JSON.stringify(order))
}

export const loadConfirmationOrder = (): Order | null => {
  if (typeof window === "undefined") return null

  try {
    const rawOrder = window.sessionStorage.getItem(ORDER_STORAGE_KEY)
    return rawOrder ? JSON.parse(rawOrder) as Order : null
  } catch {
    return null
  }
}
