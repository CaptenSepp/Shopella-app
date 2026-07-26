"use client"

import { useCallback, useEffect, useMemo, useState } from "react"
import { usePathname, useRouter, useSearchParams } from "next/navigation"
import ProductFilters from "@/features/products/next/components/ProductFilters"
import MobileFiltersSheet from "@/features/products/next/components/MobileFiltersSheet"
import ProductsErrorState from "@/features/products/next/components/ProductsErrorState"
import ProductsGrid from "@/features/products/next/components/ProductsGrid"
import ProductsEmptyState from "@/features/products/next/components/ProductsEmptyState"
import ProductsLoadingState from "@/features/products/next/components/ProductsLoadingState"
import { useCategories, useProducts } from "@/features/products/hooks"
import { buildProductSearchParams, fallbackCategories, focusRingClass, getFilteredProducts, getSaleMode } from "@/features/products/products-page-tools"

const ProductsPage = () => {
  const pathname = usePathname()
  const router = useRouter()
  const searchParams = useSearchParams() // URL is source of truth
  const setSearchParams = useCallback((nextParams: URLSearchParams | Record<string, string>) => {
    const queryString = new URLSearchParams(nextParams).toString()
    router.replace(queryString ? `${pathname}?${queryString}` : pathname, { scroll: false })
  }, [pathname, router])
  const categoryQueryParam = searchParams.get("cat") || "" // selected category from URL
  const searchQuery = searchParams.get("q") || "" // search text from URL
  const initialSort = searchParams.get("sort") || "relevance" // sort value from URL
  const saleMode = getSaleMode(searchParams.get("sale")) // allow 1 or true
  const [selectedCategory, setSelectedCategory] = useState(categoryQueryParam) // live category state
  const [sortBy, setSortBy] = useState(initialSort) // live sort state
  const [isMobileFiltersOpen, setIsMobileFiltersOpen] = useState(false) // mobile sheet toggle
  const [draftCategory, setDraftCategory] = useState(categoryQueryParam) // mobile draft category
  const [draftSortBy, setDraftSortBy] = useState(initialSort) // mobile draft sort
  const { data: products = [], isLoading: isProductsLoading, error: productsError, refetch: refetchProducts } = useProducts()
  const { data: categories = [], isLoading: isCategoriesLoading, error: categoriesError, refetch: refetchCategories } = useCategories()
  const availableCategories = categories.length > 0 ? categories : fallbackCategories // safe category list

  // Keep the local UI state in sync with the URL.
  // This matters because filters can also change from links or browser navigation.
  useEffect(() => setSelectedCategory(categoryQueryParam), [categoryQueryParam]) // keep local state synced
  useEffect(() => setSortBy(initialSort), [initialSort]) // keep sort synced too
  useEffect(() => setDraftCategory(categoryQueryParam), [categoryQueryParam]) // update mobile draft category
  useEffect(() => setDraftSortBy(initialSort), [initialSort]) // update mobile draft sort

  // Build the final list from the raw API data and the current filter state.
  // useMemo helps avoid repeating the full filter and sort work on unrelated renders.
  const filteredProducts = useMemo(() => getFilteredProducts({ products, saleMode, searchQuery, selectedCategory, sortBy }), [products, saleMode, searchQuery, selectedCategory, sortBy])
  const hasBlockingLoadFailure = (productsError || categoriesError) && products.length === 0 && categories.length === 0

  // Write the chosen filter state back into the URL so refresh and sharing still work.
  const updateParams = (category: string, sort: string) => {
    setSearchParams(buildProductSearchParams({ category, query: searchQuery, saleMode, sort }))
  }

  // Retry only the requests that failed instead of blindly re-running everything.
  const retryFailedQueries = () => {
    const retries: Promise<unknown>[] = []
    if (productsError) retries.push(refetchProducts())
    if (categoriesError) retries.push(refetchCategories())

    // When there is no single known failed query, retry both requests together.
    if (retries.length === 0) retries.push(refetchProducts(), refetchCategories())
    void Promise.all(retries)
  }

  // The mobile sheet edits draft values first, then copies them into the live page state only on Done.
  const applyMobileFilters = () => {
    setSelectedCategory(draftCategory)
    setSortBy(draftSortBy)
    updateParams(draftCategory, draftSortBy)
    setIsMobileFiltersOpen(false)
  }

  const handleOpenMobileFilters = () => {
    setIsMobileFiltersOpen(true) // Keep the button handler named so the JSX stays shorter.
  }

  const handleCloseMobileFilters = useCallback(() => {
    setIsMobileFiltersOpen(false) // Reuse the same close action in every place that hides the sheet.
  }, [])

  const handleCategoryChange = (nextCategory: string) => {
    setSelectedCategory(nextCategory)
    updateParams(nextCategory, sortBy)
  }

  const handleSortChange = (nextSort: string) => {
    setSortBy(nextSort)
    updateParams(selectedCategory, nextSort)
  }

  const clearFilters = () => {
    setSelectedCategory("")
    setSortBy("relevance")
    setDraftCategory("")
    setDraftSortBy("relevance")
    setSearchParams({})
  }

  if (isProductsLoading || isCategoriesLoading) return <ProductsLoadingState />
  if (hasBlockingLoadFailure) return <ProductsErrorState errorMessage={productsError?.message || categoriesError?.message || "Failed to load data"} onRetry={retryFailedQueries} />

  return (
    <div className="products-page">
      <header className="products-page__header">
        <div>
          <p className="products-page__eyebrow">Shop the catalogue</p>
          <h1 className="products-page__title">Products</h1>
        </div>
        <span className="products-page__count" aria-live="polite">{filteredProducts.length} results</span>
      </header>
      {(selectedCategory || searchQuery || saleMode || sortBy !== "relevance") ? (
        <div className="products-page__active-filters">
          <span>{searchQuery ? `Search: “${searchQuery}”` : selectedCategory ? `Category: ${selectedCategory}` : saleMode ? "Sale picks" : `Sorted: ${sortBy}`}</span>
          <button type="button" className="btn btn-secondary btn-sm" onClick={clearFilters}>Clear filters</button>
        </div>
      ) : null}
      <ProductsMobileToolbar resultCount={filteredProducts.length} onOpenFilters={handleOpenMobileFilters} />
      <div className="products-page__content">
        <ProductsDesktopFilters
          availableCategories={availableCategories}
          selectedCategory={selectedCategory}
          sortBy={sortBy}
          onCategoryChange={handleCategoryChange}
          onSortChange={handleSortChange}
        />
        {filteredProducts.length > 0 ? <ProductsGrid products={filteredProducts} /> : <ProductsEmptyState onClear={clearFilters} />}
      </div>
      {isMobileFiltersOpen && (
        <MobileFiltersSheet
          availableCategories={availableCategories}
          draftCategory={draftCategory}
          draftSortBy={draftSortBy}
          onApply={applyMobileFilters}
          onCategoryChange={setDraftCategory}
          onClose={handleCloseMobileFilters}
          onSortChange={setDraftSortBy}
        />
      )}
    </div>
  )
}

type ProductsMobileToolbarProps = {
  resultCount: number
  onOpenFilters: () => void
}

const ProductsMobileToolbar = ({ resultCount, onOpenFilters }: ProductsMobileToolbarProps) => {
  return (
    <div className="mb-4 flex items-center justify-between gap-3 md:hidden">
      <button type="button" className={`btn btn-secondary btn-sm products-mobile-toolbar__filter-button ${focusRingClass}`} onClick={onOpenFilters}>
        Filter & Sort
      </button>
      <div className="u-text-sm text-muted">{resultCount} results</div>
    </div>
  )
}

type ProductsDesktopFiltersProps = {
  availableCategories: typeof fallbackCategories
  selectedCategory: string
  sortBy: string
  onCategoryChange: (nextCategory: string) => void
  onSortChange: (nextSort: string) => void
}

const ProductsDesktopFilters = ({
  availableCategories,
  selectedCategory,
  sortBy,
  onCategoryChange,
  onSortChange,
}: ProductsDesktopFiltersProps) => {
  return (
    <aside className="hidden w-64 shrink-0 md:block" aria-label="Product filters">
      <ProductFilters
        selectedCategory={selectedCategory}
        sortBy={sortBy}
        availableCategories={availableCategories}
        focusRingClass={focusRingClass}
        title="Filter & Sort"
        onCategoryChange={onCategoryChange}
        onSortChange={onSortChange}
      />
    </aside>
  )
}

export default ProductsPage
