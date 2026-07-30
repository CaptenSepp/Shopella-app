"use client"

import type { Product } from "@/features/products/services"
import ProductCard, { type ProductLinkComponent } from "./ProductCard"

type ProductsGridProps = {
  LinkComponent: ProductLinkComponent
  products: Product[]
}

const ProductsGrid = ({ LinkComponent, products }: ProductsGridProps) => (
  <section className="flex-1 grid__cards" aria-label="Product results">
    {products.length === 0 && <div className="text-muted">No products match your filters.</div>}
    {products.length > 0 && (
      <ul className="contents">
        {products.map((product) => (
          <li key={product.id}>
            <ProductCard LinkComponent={LinkComponent} product={product} />
          </li>
        ))}
      </ul>
    )}
  </section>
)

export default ProductsGrid
