"use client"

import Link from "next/link"

const ErrorPage = ({ error }: { error: Error & { digest?: string } }) => (
  <div className="app-page-shell app-page-shell--narrow app-page-shell--center">
    <h1 className="u-text-2xl u-font-semibold mb-2">Oops!</h1>
    <p className="text-muted mb-2">Something went wrong while loading this page.</p>
    <p className="text-muted mb-6">{error.message || "Unexpected error."}</p>

    <div className="app-state-panel__actions">
      <Link href="/" className="btn btn-primary">Go home</Link>
      <Link href="/products" className="btn btn-secondary">Browse products</Link>
    </div>
  </div>
)

export default ErrorPage
