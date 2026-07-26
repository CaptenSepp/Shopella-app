import type { Product } from "@/features/products/services"
import ProductCard from "./ProductCard"

const ProductsGrid = ({ products }: { products: Product[] }) => (
  <section className="flex-1 grid__cards" aria-label="Product results">
    {products.length === 0 && <div className="text-muted">No products match your filters.</div>}
    {products.length > 0 && (
      <ul className="contents">
        {products.map((product) => (
          <li key={product.id}>
            <ProductCard product={product} />
          </li>
        ))}
      </ul>
    )}
  </section>
)

export default ProductsGrid
