import HomeProductScroller from "./HomeProductScroller"
import type { ProductLinkComponent } from "@/features/products/components/ProductCard"

type BestSellersRowProps = { // section props
  LinkComponent: ProductLinkComponent
  title?: string
  subtitle?: string
}

const BestSellersRow = ({ LinkComponent, title = "Best Sellers", subtitle = "Most loved picks this week" }: BestSellersRowProps) => {
  return <HomeProductScroller LinkComponent={LinkComponent} title={title} subtitle={subtitle} limit={10} /> // use shared home scroller
}

export default BestSellersRow
