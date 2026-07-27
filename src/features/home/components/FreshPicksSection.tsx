import { ArrowRight } from "lucide-react"
import { Link } from "react-router-dom"
import middleBannerImg from "@/assets/images/Banner-middle.png"

const FreshPicksSection = () => (
  <section className="fresh-picks">
    <img src={middleBannerImg} alt="" className="fresh-picks__image" loading="lazy" />
    <div className="fresh-picks__content">
      <p className="fresh-picks__eyebrow">Curated this week</p>
      <h2>Fresh picks with a purpose</h2>
      <p>Explore highly rated arrivals selected for everyday quality, value, and usefulness.</p>
      <Link to="/products?sort=rating-desc" className="btn btn-primary">
        Shop the edit <ArrowRight size={17} aria-hidden="true" />
      </Link>
    </div>
  </section>
)

export default FreshPicksSection
