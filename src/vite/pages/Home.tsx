import { useRef } from "react"
import { useViewportReveal } from "@/components/ui/use-viewport-reveal"
import { categoryCards } from "@/features/products/data/categories"
import {
  Banner,
  BestSellersRow,
  BrandStoryMini,
  CategoryGrid,
  FeaturedCollectionGrid,
  FreshPicksSection,
  Scrollbar,
  ShopCtaSection,
  ShoppingStepsSection,
  TrustBar,
} from "@/features/home/components"
import ViteLink from "@/vite/components/ViteLink"

const Home = () => {
  const pageRef = useRef<HTMLDivElement | null>(null)
  useViewportReveal(pageRef)

  return (
    <div ref={pageRef} className="home-page flex-column pb-10">
      <Banner />
      <TrustBar />
      <CategoryGrid cards={categoryCards} />

      <BestSellersRow
        LinkComponent={ViteLink}
        title="Best sellers this week"
        subtitle="Most loved picks right now"
      />

      <FeaturedCollectionGrid />
      <BrandStoryMini />

      <FreshPicksSection />
      <Scrollbar LinkComponent={ViteLink} offset={0} title="The Fresh Picks edit" subtitle="Highly rated arrivals worth a closer look" />
      <Scrollbar LinkComponent={ViteLink} offset={8} title="Top-rated deals near you" subtitle="Popular value picks from the wider catalogue" />

      <ShoppingStepsSection />
      <ShopCtaSection />
    </div>
  )
}

export default Home
