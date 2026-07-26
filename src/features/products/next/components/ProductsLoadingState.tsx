import ProductSkeletonCard from "./ProductSkeletonCard"

const ProductsLoadingState = () => (
  <section className="products-state" role="status" aria-live="polite" aria-label="Loading products">
    <span className="sr-only">Loading products...</span>
    <div className="products-state__skeleton-grid">
      {Array.from({ length: 8 }, (_, index) => <ProductSkeletonCard key={index} />)}
    </div>
  </section>
)

export default ProductsLoadingState
