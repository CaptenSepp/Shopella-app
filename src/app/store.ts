import { configureStore } from '@reduxjs/toolkit'
import { useDispatch } from 'react-redux'
import cartReducer from '@/features/cart/cartSlice'
import wishlistReducer from '@/features/wishlist/wishlistSlice'
import authReducer from '@/features/auth/authSlice'
import type { Product } from '@/features/products/services'

function loadState<T>(key: string): T | undefined {
  if (typeof window === 'undefined') return undefined

  try {
    const raw = localStorage.getItem(key)
    if (!raw) return undefined // Returning undefined here lets the reducer fall back to its normal initial state.
    return JSON.parse(raw) as T
  } catch {
    return undefined // Broken JSON or blocked storage should not stop the app from booting.
  }
}

function saveState(key: string, value: unknown) {
  if (typeof window === 'undefined') return

  try {
    localStorage.setItem(key, JSON.stringify(value)) // Save only plain serializable slice data so restore stays predictable.
  } catch {
    // If storage fails, keep the current session running instead of crashing on every store update.
  }
}

type PreloadedCart = { items: (Product & { quantity: number })[] }
type PreloadedWishlist = { items: Product[] }

const preloadedCart = loadState<PreloadedCart>('cart')
const preloadedWishlist = loadState<PreloadedWishlist>('wishlist')

// Build a full preloaded object even when one slice is missing.
// Redux store setup is simpler when each reducer always receives a complete shape.
const preloadedState: { cart: PreloadedCart; wishlist: PreloadedWishlist } = {
  cart: preloadedCart ?? { items: [] },
  wishlist: preloadedWishlist ?? { items: [] }
}

export const store = configureStore({
  reducer: {
    cart: cartReducer,
    wishlist: wishlistReducer,
    auth: authReducer
  },
  preloadedState: { ...preloadedState, auth: { user: null } }
})

// Save only the slices that are meant to survive a refresh.
// This keeps persistence explicit instead of silently storing the whole Redux tree.
store.subscribe(() => {
  const state = store.getState()
  saveState('cart', state.cart)
  saveState('wishlist', state.wishlist)
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
export const useAppDispatch = () => useDispatch<AppDispatch>()
