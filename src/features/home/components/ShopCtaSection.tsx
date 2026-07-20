import { Link } from "react-router-dom"
import newsletterBannerImg from "@/assets/images/Banner-newsletter.png"

const ShopCtaSection = () => (
  <section className="shop-cta">
    <img src={newsletterBannerImg} alt="A curated Shopella collection" className="shop-cta__image" loading="lazy" />
    <div className="shop-cta__content">
      <p className="shop-cta__eyebrow">Ready for a fresh find?</p>
      <h2>Explore the complete collection</h2>
      <p>Browse useful essentials, compare clear prices, and save your favourites.</p>
      <Link to="/products" className="btn btn-primary">Browse all products</Link>
    </div>
  </section>
)

export default ShopCtaSection
