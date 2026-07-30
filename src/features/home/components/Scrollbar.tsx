import HomeProductScroller from "./HomeProductScroller"
import type { ProductLinkComponent } from "@/features/products/components/ProductCard"

type ScrollbarProps = { // shared row options
  LinkComponent: ProductLinkComponent
  offset?: number
  subtitle?: string
  title?: string
}

const Scrollbar = ({ LinkComponent, offset = 0, subtitle, title }: ScrollbarProps) => {
  return <HomeProductScroller LinkComponent={LinkComponent} title={title} subtitle={subtitle} offset={offset} limit={8} /> // use shared home scroller
}

export default Scrollbar
