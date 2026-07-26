type ProductsEmptyStateProps = { onClear: () => void }

const ProductsEmptyState = ({ onClear }: ProductsEmptyStateProps) => (
  <div className="app-state-panel products-empty-state">
    <h2 className="u-text-xl u-font-semibold">No matching products</h2>
    <p className="text-muted">Try a different search or reset the current filters.</p>
    <button type="button" className="btn btn-primary" onClick={onClear}>Clear filters</button>
  </div>
)

export default ProductsEmptyState
