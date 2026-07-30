"use client"

import { useEffect, useState } from 'react'
import Link from 'next/link'
import { useSearchParams } from 'next/navigation'
import type { Order } from '@/features/orders/types'
import ProductPrice from '@/features/products/components/ProductPrice'
import { useAppDispatch } from '@/app/store'
import { clearCart } from '@/features/cart/cartSlice'
import { loadConfirmationOrder } from '../order-confirmation-storage'

const OrderConfirmation = () => { // post-order confirmation screen
  const searchParams = useSearchParams() // read query params
  const dispatch = useAppDispatch()
  const orderId = searchParams.get('orderId') // read order id from URL
  const [order, setOrder] = useState<Order | null>(null)

  useEffect(() => {
    setOrder(loadConfirmationOrder())
    if (searchParams.get("payment") === "success") dispatch(clearCart())
  }, [dispatch, searchParams])

  return (
    <div className="app-page-shell app-page-shell--narrow app-page-shell--center">
      <h1 className="u-text-2xl u-font-semibold mb-2">Thank you!</h1>
      <p className="text-muted mb-4">Your order has been placed successfully.</p>
      {orderId && ( // show order id when present
        <p className="text-muted mb-4">Order ID: {orderId}</p>
      )}
      {order && ( // show summary from created order
        <div className="surface-card mb-6 p-4 text-left"> {/* summary card */}
          <div className="u-font-semibold mb-2">Order Summary</div>
          <div className="space-y-2">
            {order.items.map((item) => (
              <div key={item.id} className="flex justify-between u-text-sm">
                <span className="truncate">{item.title} x {item.quantity}</span>
                <ProductPrice price={item.price} discountPercentage={item.discountPercentage} quantity={item.quantity} />
              </div>
            ))}
          </div>
          <div className="mt-3 border-t pt-3 flex justify-between u-font-semibold">
            <span>Total</span><span>${order.totals.total.toFixed(2)} USD</span>
          </div>
        </div>
      )}
      <div className="app-state-panel__actions">
        <Link href="/products" className="btn btn-secondary">Continue Shopping</Link> {/* back to catalog */}
        <Link href="/" className="btn btn-primary">Go Home</Link> {/* back to home */}
      </div>
    </div>
  )
}

export default OrderConfirmation
