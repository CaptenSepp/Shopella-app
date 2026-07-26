import Link from "next/link"

const NotFoundPage = () => (
  <div className="app-page-shell app-page-shell--narrow app-page-shell--center">
    <h1 className="mb-2 u-text-2xl u-font-semibold">Page not found</h1>
    <p className="mb-6 text-muted">The page you are looking for does not exist.</p>

    <div className="app-state-panel__actions">
      <Link href="/" className="btn btn-primary">Go home</Link>
      <Link href="/products" className="btn btn-secondary">Browse products</Link>
    </div>
  </div>
)

export default NotFoundPage
