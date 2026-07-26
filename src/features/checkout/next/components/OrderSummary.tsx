import type { Product } from "@/features/products/services"
import ProductPrice from "@/features/products/next/components/ProductPrice"
import { calculateOrderTotals } from "@/features/orders/order-calculations"

type OrderSummaryProps = {
  items: Array<Product & { quantity: number }>
}

const OrderSummary = ({ items }: OrderSummaryProps) => {
  const { subtotal, shipping, total } = calculateOrderTotals(items) // shared discounted totals

  return (
    <aside className="surface-card p-4">
      <h2 className="mb-3 u-text-lg u-font-semibold">Order Summary</h2>
      <ul className="mb-4 space-y-2">
        {items.map((item) => (
          <li key={item.id} className="flex justify-between u-text-sm">
            <span className="truncate">{item.title} x {item.quantity}</span>
            <ProductPrice price={item.price} discountPercentage={item.discountPercentage} quantity={item.quantity} />
          </li>
        ))}
      </ul>
      <div className="space-y-1 text-muted">
        <div className="flex justify-between"><span>Subtotal</span><span>${subtotal.toFixed(2)}</span></div>
        <div className="flex justify-between"><span>Shipping</span><span>${shipping.toFixed(2)}</span></div>
      </div>
      <div className="mt-3 flex justify-between border-t pt-3 u-font-bold">
        <span>Total</span><span>${total.toFixed(2)} USD</span>
      </div>
      <p className="checkout-summary__delivery">Estimated delivery: 3–5 business days.</p>
    </aside>
  )
}

export default OrderSummary
