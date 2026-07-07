import { gridMiddle, gridTop } from "@/features/products/data/categories"
import middleBannerImg from "@/assets/images/Banner-middle.png"
import {
  Banner,
  BestSellersRow,
  BrandStoryMini,
  CategoryGrid,
  FeaturedCollectionGrid,
  FullBleedImage,
  NewsletterSignupSection,
  RichText,
  Scrollbar,
  SocialProofSection,
  TrustBar,
} from "@/features/home/components"
import { HOME_SECTION_TITLES } from "@/features/home/components/HomeSections"

const Home = () => {
  return (
    <div className="home-page flex-column pb-10">
      <Banner />
      <TrustBar />
      <FeaturedCollectionGrid />
      <CategoryGrid cards={gridTop} />

      <BestSellersRow
        title="Best sellers this week"
        subtitle="Most loved picks right now"
      />

      <BrandStoryMini />

      <FullBleedImage src={middleBannerImg} alt="Middle banner" title={HOME_SECTION_TITLES.freshPicks} />
      <Scrollbar offset={0} title="Best picks for you" />

      <RichText>{HOME_SECTION_TITLES.trendingNow}</RichText>
      <CategoryGrid cards={gridMiddle} />

      <RichText>{HOME_SECTION_TITLES.topRatedDeals}</RichText>
      <Scrollbar offset={8} title="Best sellers from your region" />

      <SocialProofSection />
      <NewsletterSignupSection />
    </div>
  )
}

export default Home
