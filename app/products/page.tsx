import { Suspense } from "react"
import ProductsLoadingState from "@/features/products/next/components/ProductsLoadingState"
import ProductsPage from "@/features/products/next/pages/Products"

export default function ProductsRoute() {
  return (
    <Suspense fallback={<ProductsLoadingState />}>
      <ProductsPage />
    </Suspense>
  )
}
