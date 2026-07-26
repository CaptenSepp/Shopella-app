import Image from "next/image";
import Link from "next/link";
import summerEssentialsImg from "@/assets/images/summer-essentials.jpg"; // summer card image
import dailyRitualsImg from "@/assets/images/daily-rituals.jpg"; // rituals card image
import freshFindsImg from "@/assets/images/fresh-finds.jpg"; // fresh finds card image

const cards = [ // featured collections
  { title: "Summer Essentials", cta: "Shop Collection", image: summerEssentialsImg, href: "/products?cat=beauty" },
  { title: "Daily Rituals", cta: "Explore Set", image: dailyRitualsImg, href: "/products?cat=fragrances" },
  { title: "Fresh Finds", cta: "Browse Picks", image: freshFindsImg, href: "/products?sort=rating-desc" },
];

const FeaturedCollectionGrid = () => ( // featured grid section
  <section className="featured-grid"> {/* section wrapper */}
    <div className="featured-grid__title">Featured Collections</div> {/* section title */}
    <div className="featured-grid__cards"> {/* cards grid */}
      {cards.map((card) => (
        <article key={card.title} className="featured-card"> {/* collection card */}
          <Image src={card.image} alt={card.title} className="featured-card__image" loading="lazy" /> {/* defer this below-the-fold image */}
          <div className="featured-card__content"> {/* text + button */}
            <span className="featured-card__status">Curated collection</span> {/* collection label */}
            <div className="featured-card__title">{card.title}</div> {/* collection name */}
            <Link href={card.href} className="btn featured-card__btn">{card.cta}</Link> {/* working CTA */}
          </div>
        </article>
      ))}
    </div>
  </section>
);

export default FeaturedCollectionGrid;
