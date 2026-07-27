import HomeProductScroller from "./HomeProductScroller"

type ScrollbarProps = { // shared row options
  offset?: number
  subtitle?: string
  title?: string
}

const Scrollbar = ({ offset = 0, subtitle, title }: ScrollbarProps) => {
  return <HomeProductScroller title={title} subtitle={subtitle} offset={offset} limit={8} /> // use shared home scroller
}

export default Scrollbar
