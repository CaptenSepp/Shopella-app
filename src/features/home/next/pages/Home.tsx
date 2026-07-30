"use client"

import { useRef } from "react"
import { useViewportReveal } from "@/components/ui/use-viewport-reveal"
import { categoryCards } from "@/features/products/data/categories"
import { BrandStoryMini, CategoryGrid, FeaturedCollectionGrid, FreshPicksSection, ShopCtaSection } from "@/features/home/next/components"
import { BestSellersRow, Scrollbar, ShoppingStepsSection, TrustBar } from "@/features/home/components"
import ModernHero from "@/features/home/components/ModernHero"
import NextLink from "@/features/products/next/components/NextLink"
import SplashScreen from "@/features/splash/components/SplashScreen"

const Home = () => {
  const pageRef = useRef<HTMLDivElement | null>(null)
  useViewportReveal(pageRef)

  return (
    <>
      <SplashScreen />
      <div ref={pageRef} className="home-page flex-column pb-10">
        <ModernHero LinkComponent={NextLink} />
        <TrustBar />
        <CategoryGrid cards={categoryCards} />
        <BestSellersRow LinkComponent={NextLink} title="Best sellers this week" subtitle="Most loved picks right now" />
        <FeaturedCollectionGrid />
        <BrandStoryMini />
        <FreshPicksSection />
        <Scrollbar LinkComponent={NextLink} offset={0} title="The Fresh Picks edit" subtitle="Highly rated arrivals worth a closer look" />
        <Scrollbar LinkComponent={NextLink} offset={8} title="Top-rated deals near you" subtitle="Popular value picks from the wider catalogue" />
        <ShoppingStepsSection />
        <ShopCtaSection />
      </div>
    </>
  )
}

export default Home
