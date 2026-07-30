type SortOption = { // simple sort option model
  value: string
  label: string
}

type ProductSortSelectProps = { // props from the filter form
  value: string
  focusRingClass: string
  onChange: (nextValue: string) => void
}

const sortOptions: SortOption[] = [ // shared sort options list
  { value: "relevance", label: "Relevance" },
  { value: "price-asc", label: "Price: Low to High" },
  { value: "price-desc", label: "Price: High to Low" },
  { value: "rating-desc", label: "Rating" },
  { value: "title-asc", label: "Title A-Z" },
]

const ProductSortSelect = ({ value, onChange }: ProductSortSelectProps) => {
  const [isOpen, setIsOpen] = useState(false)
  const containerRef = useRef<HTMLDivElement>(null)
  const selectedOption = sortOptions.find((option) => option.value === value) || sortOptions[0]

  useEffect(() => {
    const closeOnOutsideClick = (event: PointerEvent) => {
      if (!containerRef.current?.contains(event.target as Node)) setIsOpen(false)
    }

    document.addEventListener("pointerdown", closeOnOutsideClick)
    return () => document.removeEventListener("pointerdown", closeOnOutsideClick)
  }, [])

  return (
    <div ref={containerRef} className="sort-select">
      <button
        type="button"
        className="sort-select__trigger"
        aria-haspopup="listbox"
        aria-expanded={isOpen}
        onClick={() => setIsOpen((current) => !current)}
        onKeyDown={(event) => {
          if (event.key === "Escape") setIsOpen(false)
          if (event.key === "ArrowDown") {
            event.preventDefault()
            setIsOpen(true)
          }
        }}
      >
        {selectedOption.label}
        <ChevronDown size={15} aria-hidden="true" />
      </button>
      {isOpen ? (
        <div className="sort-select__menu" role="listbox" aria-label="Sort by">
          {sortOptions.map((option) => (
            <button
              key={option.value}
              type="button"
              role="option"
              aria-selected={option.value === value}
              className={`sort-select__option ${option.value === value ? "sort-select__option--selected" : ""}`}
              onClick={() => {
                onChange(option.value)
                setIsOpen(false)
              }}
            >
              {option.label}
            </button>
          ))}
        </div>
      ) : null}
    </div>
  )
}

export default ProductSortSelect
import { ChevronDown } from "lucide-react"
import { useEffect, useRef, useState } from "react"
