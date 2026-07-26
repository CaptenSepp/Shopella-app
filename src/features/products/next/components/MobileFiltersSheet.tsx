import type { Category } from "@/features/products/services"
import { focusRingClass } from "@/features/products/products-page-tools"
import ProductFilters from "./ProductFilters"
import { useRef } from "react"
import { useDialogFocus } from "@/components/ui/use-dialog-focus"

type MobileFiltersSheetProps = {
  availableCategories: Category[]
  draftCategory: string
  draftSortBy: string
  onApply: () => void
  onCategoryChange: (nextCategory: string) => void
  onClose: () => void
  onSortChange: (nextSort: string) => void
}

const MobileFiltersSheet = ({
  availableCategories,
  draftCategory,
  draftSortBy,
  onApply,
  onCategoryChange,
  onClose,
  onSortChange,
}: MobileFiltersSheetProps) => {
  const panelRef = useRef<HTMLDivElement | null>(null)
  useDialogFocus({ containerRef: panelRef, isOpen: true, onClose })

  return (
  <div className="products-filters-sheet md:hidden" role="dialog" aria-modal="true" aria-labelledby="mobile-filters-title">
    <button type="button" className="products-filters-sheet__backdrop" aria-label="Close filters" onClick={onClose} />
    <div ref={panelRef} className="products-filters-sheet__panel">
      <div className="products-filters-sheet__header">
        <h2 id="mobile-filters-title" className="mb-0 u-text-lg u-font-semibold">Filter & Sort</h2>
        <div className="products-filters-sheet__header-actions">
          <button type="button" className={`btn btn-secondary btn-sm ${focusRingClass}`} onClick={onClose}>Cancel</button>
          <button type="button" className={`btn btn-primary btn-sm ${focusRingClass}`} onClick={onApply}>Done</button>
        </div>
      </div>
      <ProductFilters selectedCategory={draftCategory} sortBy={draftSortBy} availableCategories={availableCategories} focusRingClass={focusRingClass} title="Filters" onCategoryChange={onCategoryChange} onSortChange={onSortChange} />
    </div>
  </div>
  )
}

export default MobileFiltersSheet
