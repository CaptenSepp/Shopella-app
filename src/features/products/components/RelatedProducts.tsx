"use client"

import type { Product } from "../services"
import ProductCard, { type ProductLinkComponent } from "./ProductCard"

type RelatedProductsProps = {
  LinkComponent: ProductLinkComponent
  products: Product[]
}

const RelatedProducts = ({ LinkComponent, products }: RelatedProductsProps) => {
  if (products.length === 0) return null

  return (
    <section className="related-products" aria-labelledby="related-products-title">
      <h2 id="related-products-title" className="related-products__title">You may also like</h2>
      <div className="related-products__grid">
        {products.map((product) => <ProductCard key={product.id} LinkComponent={LinkComponent} product={product} />)}
      </div>
    </section>
  )
}

export default RelatedProducts
