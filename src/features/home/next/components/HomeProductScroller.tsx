"use client"

import React from "react"
import { useProducts } from "@/features/products/hooks"
import type { Product } from "@/features/products/services"
import ProductMediaCard from "./ProductMediaCard"
import { animateScrollLeft, getCardTargetLeft, getNearestCardLeft } from "@/features/home/components/product-row-tools"

type HomeProductScrollerProps = { // shared home product row props
  title?: string
  subtitle?: string
  limit?: number
  offset?: number
}

const HomeProductScroller = ({ title, subtitle, limit = 8, offset = 0 }: HomeProductScrollerProps) => {
  const { data: products = [], isLoading, error, refetch } = useProducts() // load product row data
  const listRef = React.useRef<HTMLDivElement | null>(null) // scroll container ref
  const dragStateRef = React.useRef({ isDragging: false, didDrag: false, startX: 0, startScrollLeft: 0 }) // drag state

  const scrollByOneCard = (direction: -1 | 1) => { // move to next or previous card
    const el = listRef.current
    if (!el) return
    const targetLeft = getCardTargetLeft(el, direction)
    if (targetLeft === null) return
    animateScrollLeft(el, targetLeft)
  }

  const handleWheelScroll = (event: React.WheelEvent<HTMLDivElement>) => { // Shift + wheel moves row
    const el = listRef.current
    if (!el || !event.shiftKey) return
    const wheelDelta = event.deltaX || event.deltaY
    event.preventDefault()
    el.scrollBy({ left: wheelDelta, behavior: "auto" })
  }

  const handleMouseDown = (event: React.MouseEvent<HTMLDivElement>) => { // start drag scroll
    const el = listRef.current
    if (!el) return
    dragStateRef.current = { isDragging: true, didDrag: false, startX: event.clientX, startScrollLeft: el.scrollLeft }
    el.style.scrollSnapType = "none"
  }

  const handleMouseMove = (event: React.MouseEvent<HTMLDivElement>) => { // move row while dragging
    const el = listRef.current
    const dragState = dragStateRef.current
    if (!el || !dragState.isDragging) return
    event.preventDefault()
    if (Math.abs(event.clientX - dragState.startX) > 6) dragState.didDrag = true
    el.scrollLeft = dragState.startScrollLeft - (event.clientX - dragState.startX)
  }

  const stopMouseDrag = () => { // finish drag and snap
    const el = listRef.current
    const dragState = dragStateRef.current
    const wasDragging = dragState.isDragging
    dragState.isDragging = false
    if (!wasDragging || !el) return
    if (!dragState.didDrag) {
      el.style.scrollSnapType = "x mandatory"
      return
    }

    const targetLeft = getNearestCardLeft(el) // snap to nearest card
    if (targetLeft === null) {
      el.style.scrollSnapType = "x mandatory"
      return
    }
    animateScrollLeft(el, targetLeft)
  }

  const handleCardClick = (event: React.MouseEvent<HTMLAnchorElement>) => { // block click after drag
    if (!dragStateRef.current.didDrag) return
    event.preventDefault()
    event.stopPropagation()
    dragStateRef.current.didDrag = false
  }

  const visibleProducts = products.slice(offset, offset + limit) // choose this row products

  if (isLoading) return <div className="best-row__loading">Loading...</div>
  if (error) {
    return (
      <div className="best-row__error"> {/* shared error block */}
        <p className="u-text-danger">Error: {error.message}</p>
        <button className="btn btn-primary btn-sm" onClick={() => { void refetch() }}>Retry</button>
      </div>
    )
  }

  return (
    <section className="best-row"> {/* shared home product scroller */}
      <div className="best-row__header">
        <div>
          <div className="best-row__title">{title}</div>
          {subtitle && <div className="best-row__subtitle">{subtitle}</div>}
        </div>
        <div className="best-row__actions">
          <button type="button" className="scroll-btn" aria-label="Scroll left" onClick={() => scrollByOneCard(-1)}>
            <span className="scroll-btn__icon scroll-btn__icon--left" aria-hidden="true" />
          </button>
          <button type="button" className="scroll-btn" aria-label="Scroll right" onClick={() => scrollByOneCard(1)}>
            <span className="scroll-btn__icon scroll-btn__icon--right" aria-hidden="true" />
          </button>
        </div>
      </div>

      <div ref={listRef} className="best-row__list no-scrollbar" onWheel={handleWheelScroll} onMouseDown={handleMouseDown} onMouseMove={handleMouseMove} onMouseUp={stopMouseDrag} onMouseLeave={stopMouseDrag}>
        {visibleProducts.map((product: Product) => (
          <ProductMediaCard key={product.id} product={product} onClick={handleCardClick} />
        ))}
      </div>
    </section>
  )
}

export default HomeProductScroller
