import { Link } from 'react-router-dom' // router links
import { useSelector } from 'react-redux' // redux selector
import { RootState } from '@/app/store' // root state type
import { useOrders } from '@/features/orders/hooks'
import ProductPrice from '@/features/products/components/ProductPrice'
import { isSupabaseConfigured } from '@/features/auth/supabase-client'

type OrdersPageProps = {
  showAccountHeader?: boolean
}

const OrdersPage = ({ showAccountHeader = false }: OrdersPageProps) => { // orders list page
  const user = useSelector((state: RootState) => state.auth.user) // read auth user
  const { data: orders = [], error, isLoading, refetch } = useOrders(Boolean(user))

  if (!user) { // protect orders page
    return (
      <div className="app-page-shell app-page-shell--narrow app-page-shell--center">
        <h1 className="u-text-2xl u-font-semibold mb-2">Sign in required</h1> {/* title */}
        <p className="text-muted mb-6">Please sign in to view your orders.</p> {/* hint */}
        <Link to="/login" className="btn btn-primary">Go to login</Link> {/* CTA */}
      </div>
    )
  }

  if (isLoading) { // loading state
    return <div className="app-state-panel" role="status" aria-live="polite">Loading orders...</div>
  }

  if (error) {
    return (
      <div className="app-state-panel app-page-shell app-page-shell--center">
        <h1 className="u-text-2xl u-font-semibold">Orders could not be loaded</h1>
        <p className="text-muted">{error.message}</p>
        <button type="button" className="btn btn-primary" onClick={() => void refetch()}>Try again</button>
      </div>
    )
  }

  if (orders.length === 0) { // empty state
    return (
      <div className="app-page-shell app-page-shell--narrow app-page-shell--center">
        <h1 className="u-text-2xl u-font-semibold mb-2">No orders yet</h1> {/* title */}
        <p className="text-muted mb-6">Start shopping to place your first order.</p> {/* hint */}
        <Link to="/products" className="btn btn-primary">Browse products</Link> {/* CTA */}
      </div>
    )
  }

  return (
    <div className="app-page-shell app-page-shell--wide">
      {showAccountHeader ? (
        <header className="mb-6">
          <h1 className="u-text-2xl u-font-semibold mb-2">Account</h1>
          <p className="text-muted">{user.name} · {user.email}</p>
        </header>
      ) : null}
      {showAccountHeader ? (
        <h2 className="u-text-2xl u-font-semibold mb-6">Your Orders</h2>
      ) : (
        <h1 className="u-text-2xl u-font-semibold mb-6">Your Orders</h1>
      )} {/* page title */}
      <div className="space-y-6">
        {orders.map((order) => ( // render each order
          <article key={order.id} className="surface-card p-4">
            {!isSupabaseConfigured ? <p className="order-demo-label">Demo order · no real charge</p> : null}
            <header className="flex flex-wrap items-center justify-between gap-2 mb-4">
              <div>
                <div className="u-text-sm text-muted">Order ID</div>
                <div className="u-font-semibold">{order.id}</div>
              </div>
              <div className="text-right">
                <div className={`order-status order-status--${order.status ?? "pending"}`}>{order.status ?? "pending"}</div>
                <div className="u-text-sm text-muted">Total</div>
                <div className="u-font-semibold">${order.totals.total.toFixed(2)} USD</div>
              </div>
            </header>
            <div className="space-y-2">
              {order.items.map((item) => ( // render order items
                <div key={item.id} className="flex justify-between u-text-sm">
                  <span className="truncate">{item.title} x {item.quantity}</span>
                  <ProductPrice price={item.price} discountPercentage={item.discountPercentage} quantity={item.quantity} />
                </div>
              ))}
            </div>
            {order.receipt ? (
              <p className="u-text-sm mt-3">
                Receipt <strong>{order.receipt.number}</strong>
                {order.receipt.url ? <> · <a className="app-text-link" href={order.receipt.url} target="_blank" rel="noreferrer">View Stripe receipt</a></> : null}
              </p>
            ) : null}
            {(order.statusHistory?.length ?? 0) > 0 ? (
              <ol className="order-history mt-4" aria-label="Order status history">
                {order.statusHistory.map((entry) => (
                  <li key={entry.id}>
                    <strong>{entry.status}</strong>
                    <time dateTime={entry.createdAt}>{new Date(entry.createdAt).toLocaleString()}</time>
                    {entry.note ? <span>{entry.note}</span> : null}
                  </li>
                ))}
              </ol>
            ) : null}
          </article>
        ))}
      </div>
    </div>
  )
}

export default OrdersPage
