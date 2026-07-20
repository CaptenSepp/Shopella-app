export type PricedOrderItem = {
  price: number
  discountPercentage?: number
  quantity: number
}

export const SHIPPING_PRICE = 4.99 // Keep the demo shipping rule in one shared place.

export const roundCurrency = (value: number) => Math.round((value + Number.EPSILON) * 100) / 100

export const getDiscountedUnitPrice = (price: number, discountPercentage = 0) => {
  const safeDiscount = Math.min(Math.max(discountPercentage, 0), 100)
  return roundCurrency(price * (1 - safeDiscount / 100))
}

export const calculateOrderTotals = (items: PricedOrderItem[]) => {
  // Every screen and API calculation uses the discounted price before adding shipping.
  const subtotal = roundCurrency(items.reduce((sum, item) => (
    sum + getDiscountedUnitPrice(item.price, item.discountPercentage) * item.quantity
  ), 0))
  const shipping = items.length > 0 ? SHIPPING_PRICE : 0

  return { subtotal, shipping, total: roundCurrency(subtotal + shipping) }
}
