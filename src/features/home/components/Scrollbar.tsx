import HomeProductScroller from "./HomeProductScroller"

type ScrollbarProps = { // shared row options
  offset?: number
  title?: string
}

const Scrollbar = ({ offset = 0, title }: ScrollbarProps) => {
  return <HomeProductScroller title={title} offset={offset} limit={8} /> // use shared home scroller
}

export default Scrollbar
