import { ArrowUpRight, PackageCheck, ShieldCheck, Sparkles } from "lucide-react"
import type { ProductLinkComponent } from "@/features/products/components/ProductCard"
import beautyImage from "@/assets/images/beauty.jpg"
import furnitureImage from "@/assets/images/furniture.jpg"
import fragrancesImage from "@/assets/images/fragrances.jpg"

const collectionCards = [
  { title: "Beauty", detail: "Daily rituals", image: beautyImage, href: "/products?cat=beauty" },
  { title: "Living", detail: "Considered comfort", image: furnitureImage, href: "/products?cat=furniture" },
  { title: "Fragrance", detail: "Signature scents", image: fragrancesImage, href: "/products?cat=fragrances" },
]

const getImageSource = (image: string | { src: string }) => typeof image === "string" ? image : image.src

const ModernHero = ({ LinkComponent }: { LinkComponent: ProductLinkComponent }) => (
  <section className="modern-hero" aria-labelledby="modern-hero-title">
    <div className="modern-hero__glow" aria-hidden="true" />

    <div className="modern-hero__copy">
      <p className="modern-hero__eyebrow"><Sparkles aria-hidden="true" /> Curated for everyday</p>
      <h1 id="modern-hero-title" className="modern-hero__title">
        The good stuff, <em>beautifully</em> gathered.
      </h1>
      <p className="modern-hero__intro">
        Thoughtful finds for your home, your routine, and everything in between—selected to make
        every cart feel like a discovery.
      </p>

      <div className="modern-hero__actions">
        <LinkComponent className="modern-hero__button modern-hero__button--primary" href="/products">
          Explore the shop <ArrowUpRight aria-hidden="true" />
        </LinkComponent>
        <LinkComponent className="modern-hero__button modern-hero__button--secondary" href="/products?sort=price-asc">
          Shop under $50
        </LinkComponent>
      </div>

      <ul className="modern-hero__assurances" aria-label="Shopping benefits">
        <li><PackageCheck aria-hidden="true" /> Fast, tracked delivery</li>
        <li><ShieldCheck aria-hidden="true" /> Secure checkout</li>
      </ul>
    </div>

    <div className="modern-hero__showcase" aria-label="Featured collections">
      <p className="modern-hero__showcase-label">The Shopella edit <span>01 — 03</span></p>
      <div className="modern-hero__cards">
        {collectionCards.map((card) => (
          <LinkComponent className="modern-hero__card" href={card.href} key={card.title}>
            <img className="modern-hero__card-image" src={getImageSource(card.image)} alt="" />
            <span className="modern-hero__card-shade" aria-hidden="true" />
            <span className="modern-hero__card-copy">
              <small>{card.detail}</small>
              <strong>{card.title}</strong>
            </span>
            <ArrowUpRight className="modern-hero__card-icon" aria-hidden="true" />
          </LinkComponent>
        ))}
      </div>
    </div>
  </section>
)

export default ModernHero
