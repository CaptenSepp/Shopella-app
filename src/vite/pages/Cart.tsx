import { useNavigate } from 'react-router-dom'
import CartItemsList from '@/features/cart/components/CartItemsList'
import CartSummary from '@/features/cart/components/CartSummary'

const CartPage = () => { // cart page with items and totals
  const navigate = useNavigate()

  return (
    <div className="cart-page bg-[color:var(--app-bg)] py-6 text-[color:var(--app-text)] sm:py-8 lg:py-12">
      <div className="mx-auto max-w-screen-lg px-4 md:px-8">
        <div className="mb-6 sm:mb-10 lg:mb-16">
          <h1 className="mb-4 text-center u-text-2xl u-font-bold u-text-gray-800 md:mb-6 u-text-3xl-lg">Your Cart</h1>
        </div>

        <CartItemsList /> {/* list all cart items */}
        <CartSummary onCheckout={() => navigate('/checkout')} /> {/* subtotal, shipping, total */}
      </div>
    </div>
  )
}

export default CartPage
