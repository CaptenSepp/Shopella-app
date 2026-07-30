"use client"

import { useSelector } from 'react-redux'
import { type RootState, useAppDispatch } from '@/app/store'
import { addToCart } from '@/features/cart/cartSlice'
import ProductPrice from '@/features/products/components/ProductPrice'
import type { ProductLinkComponent, ProductLinkProps } from '@/features/products/components/ProductCard'
import { toggleWishlist } from '@/features/wishlist/wishlistSlice'

const NativeLink = ({ href, ...props }: ProductLinkProps) => <a href={href} {...props} />

const WishlistItemsList = ({ LinkComponent = NativeLink }: { LinkComponent?: ProductLinkComponent }) => {
  const dispatch = useAppDispatch() // dispatch actions
  const items = useSelector((state: RootState) => state.wishlist.items) // wishlist items

  if (!items.length) { // empty state
    return (
      <div className="empty-state">Your wishlist is empty.</div>
    )
  }

  return (
    <ul className="mb-6 flex flex-col gap-4 sm:mb-8 md:gap-6">
      {items.map((item) => ( // render wishlist items
        <li key={item.id} className="line-item">
          <LinkComponent href={`/products/${item.id}`} className="media-thumb">
            {item.thumbnail ? (
              <img
                src={item.thumbnail}
                loading="lazy" // lazy-load thumbnail
                alt={item.title}
                className="media-thumb__img"
              />
            ) : (
              <span className="media-thumb__img" aria-hidden="true" />
            )}
          </LinkComponent>

          <div className="flex flex-1 flex-col justify-between py-2">
            <div>
              <div className="item-title">
                {item.title}
              </div>
              <span className="item-brand">{item.brand}</span>
            </div>

            <div>
              <ProductPrice price={item.price} discountPercentage={item.discountPercentage} className="item-price" />
              <span className={`stock-note${item.stock === 0 ? ' stock-note--empty' : ''}`}>
                {item.stock} in stock
              </span>
            </div>
          </div>

          <div className="line-item__actions">
            <div className="flex items-center gap-2">
              <button
                className="btn btn-primary btn-sm"
                onClick={() => dispatch(addToCart(item))} // add item to cart
                aria-label={`Add ${item.title} to cart`}
              >
                Add to Cart
              </button>
            </div>

            <div className="flex items-center gap-3">
              <button
                className="btn btn-danger btn-sm"
                onClick={() => dispatch(toggleWishlist(item))} // remove from wishlist
              >
                Remove
              </button>
            </div>
          </div>
        </li>
      ))}
    </ul>
  )
}

export default WishlistItemsList
