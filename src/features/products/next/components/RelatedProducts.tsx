import type { Product } from "@/features/products/services"
import ProductCard from "./ProductCard"

const RelatedProducts = ({ products }: { products: Product[] }) => {
  if (products.length === 0) return null

  return (
    <section className="related-products" aria-labelledby="related-products-title">
      <h2 id="related-products-title" className="related-products__title">You may also like</h2>
      <div className="related-products__grid">
        {products.map((product) => <ProductCard key={product.id} product={product} />)}
      </div>
    </section>
  )
}

export default RelatedProducts
