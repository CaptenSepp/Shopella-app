import { useSelector } from "react-redux"
import { Link, useNavigate } from "react-router-dom"
import { RootState, useAppDispatch } from "@/app/store"
import { clearCart } from "@/features/cart/cartSlice"
import { useCreateOrder } from "@/features/orders/hooks"
import { startOrderPayment } from "@/features/orders/services"
import CheckoutForm from "@/features/checkout/components/CheckoutForm"
import OrderSummary from "@/features/checkout/components/OrderSummary"
import CheckoutProgress from "@/features/checkout/components/CheckoutProgress"
import { loadStoredCustomer, saveStoredCustomer } from "@/features/checkout/checkout-tools"

const Checkout = () => {
  const dispatch = useAppDispatch()
  const navigate = useNavigate()
  const items = useSelector((state: RootState) => state.cart.items)
  const user = useSelector((state: RootState) => state.auth.user)
  const createOrderMutation = useCreateOrder()
  const storedCustomer = loadStoredCustomer()
  const initialCustomer = {
    ...storedCustomer,
    name: user?.name ?? storedCustomer.name,
    email: user?.email ?? storedCustomer.email,
  } // Use signed-in browser data for name/email, but keep address from checkout storage.

  return (
    <div className="app-page-shell app-page-shell--wide">
      <Link to="/cart" className="app-text-link">Back to cart</Link>
      <CheckoutProgress />
      <h1 className="checkout-page__title">Delivery details</h1>
      <div className="checkout-page__content">
        <CheckoutForm
          apiError={createOrderMutation.error?.message}
          hasItems={items.length > 0}
          initialValues={initialCustomer} // Prefill once so the user does not need to retype saved checkout details.
          isSubmitting={createOrderMutation.isPending}
          onSubmit={async (values) => {
            // Clean the values once here so every later step uses the same normalized customer data.
            const trimmedCustomer = { name: values.name.trim(), email: values.email.trim().toLowerCase(), address: values.address.trim() }

            // Create the order before clearing local state.
            // That way a failed request does not erase the user's cart.
            let order
            try {
              order = await createOrderMutation.mutateAsync([items, trimmedCustomer])
            } catch {
              return // The mutation keeps the useful API message visible and the cart unchanged.
            }

            // After success, keep the checkout details for next time and move the app into its "ordered" state.
            saveStoredCustomer(trimmedCustomer)
            let paidOrder
            try {
              paidOrder = await startOrderPayment(order)
            } catch {
              return
            }
            if (!paidOrder) return
            dispatch(clearCart()) // Clear only after success so the cart is not lost on a failed order request.
            navigate(`/order-confirmation?orderId=${order.id}`, { replace: true, state: { order: paidOrder } }) // Send the created order along with navigation so the confirmation page can render immediately.
          }}
        />
        <OrderSummary items={items} />
      </div>
    </div>
  )
}

export default Checkout
