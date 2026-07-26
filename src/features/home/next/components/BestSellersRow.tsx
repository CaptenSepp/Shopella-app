import HomeProductScroller from "./HomeProductScroller"

type BestSellersRowProps = { // section props
  title?: string
  subtitle?: string
}

const BestSellersRow = ({ title = "Best Sellers", subtitle = "Most loved picks this week" }: BestSellersRowProps) => {
  return <HomeProductScroller title={title} subtitle={subtitle} limit={10} /> // use shared home scroller
}

export default BestSellersRow
