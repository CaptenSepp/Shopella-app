"use client"

import { Minus, Plus, Trash2 } from 'lucide-react'
import { useSelector } from 'react-redux'
import { type RootState, useAppDispatch } from '@/app/store'
import { addToCart, removeFromCart, updateQuantity } from '@/features/cart/cartSlice'
import ProductPrice from '@/features/products/components/ProductPrice'

const CartItemsList = () => {
  // This shared component reads and updates the persisted Redux cart.
  const dispatch = useAppDispatch()
  const items = useSelector((state: RootState) => state.cart.items)

  if (!items.length) {
    // Keep the empty state outside the list so no empty list semantics are announced.
    return <div className="empty-state">Your cart is empty.</div>
  }

  return (
    <ul className="mb-6 flex flex-col gap-4 sm:mb-8 md:gap-6">
      {items.map((item) => (
        // Each row combines product metadata with cart-specific quantity controls.
        <li key={item.id} className="line-item">
          <div className="media-thumb">
            {item.thumbnail ? (
              <img src={item.thumbnail} loading="lazy" alt={item.title} className="media-thumb__img" />
            ) : (
              <span className="media-thumb__img" aria-hidden="true" />
            )}
          </div>

          <div className="flex flex-1 flex-col justify-between py-2">
            <div>
              <div className="item-title">{item.title}</div>
              <span className="item-brand">{item.brand}</span>
            </div>

            <div>
              <ProductPrice price={item.price} discountPercentage={item.discountPercentage} className="item-price" />
              <span className={`stock-note${item.stock <= 0 ? ' stock-note--empty' : ''}`}>{item.stock} in stock</span>
            </div>
          </div>

          <div className="line-item__actions">
            <div className="flex items-center gap-2">
              <button
                type="button"
                className="btn btn-secondary btn-sm"
                onClick={() => {
                  // A decrement from one removes the line instead of retaining zero quantity.
                  const quantity = item.quantity - 1
                  if (quantity <= 0) dispatch(removeFromCart(item.id))
                  else dispatch(updateQuantity({ id: item.id, quantity }))
                }}
                aria-label={`Decrease quantity of ${item.title}`}
              >
                <Minus size={16} aria-hidden="true" />
              </button>
              <span className="min-w-8 text-center">{item.quantity}</span>
              <button
                type="button"
                className="btn btn-primary btn-sm"
                onClick={() => dispatch(addToCart(item))}
                disabled={item.stock <= 0}
                aria-label={`Increase quantity of ${item.title}`}
              >
                <Plus size={16} aria-hidden="true" />
              </button>
            </div>

            <div className="flex items-center gap-3">
              <span className="block u-font-bold text-brand-black u-text-lg-md">
                {/* Quantity is included here to display the complete line total. */}
                <ProductPrice price={item.price} discountPercentage={item.discountPercentage} quantity={item.quantity} />
              </span>
              <button type="button" className="btn btn-danger btn-sm" onClick={() => dispatch(removeFromCart(item.id))}>
                <Trash2 size={16} aria-hidden="true" /><span>Remove</span>
              </button>
            </div>
          </div>
        </li>
      ))}
    </ul>
  )
}

export default CartItemsList
