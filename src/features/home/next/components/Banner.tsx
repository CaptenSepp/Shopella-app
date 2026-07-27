import Image from "next/image";
import Link from "next/link";
import topBannerImg from "@/assets/images/Banner-top.png"; // top banner image
import beautyImg from "@/assets/images/beauty.jpg"; // static hero card image
import fragrancesImg from "@/assets/images/fragrances.jpg"; // static hero card image

const heroCards = [ // quick attention cards
  { label: "Best seller", title: "Beauty Edit", image: beautyImg, href: "/products?cat=beauty" },
  { label: "New arrival", title: "Fragrance Drop", image: fragrancesImg, href: "/products?cat=fragrances" },
];

const Banner = () => { // hero banner section
  return (
    <div className="home-hero-wrap"> {/* keep wrapper for layout consistency */}
      <section className="home-hero full-bleed"> {/* premium dark hero */}
        <Image src={topBannerImg} alt="" className="home-hero__bg" aria-hidden="true" fetchPriority="high" loading="eager" /> {/* load the main hero first */}

        <div className="home-hero__content"> {/* text and cards layout */}
          <div className="home-hero__copy"> {/* left hero copy */}
            <p className="home-hero__eyebrow">Obsidian Orange picks</p>
            <h1 className="banner__title home-hero__title"> {/* hero headline */}
              Premium essentials for sharper everyday shopping
            </h1>

            <p className="banner__subcopy home-hero__subcopy"> {/* readable hero text */}
              Discover trusted bestsellers, fresh arrivals, and clean daily finds in one polished shop.
            </p>

            <div className="home-hero__actions"> {/* hero CTAs */}
              <Link className="btn btn-primary" href="/products"> {/* primary CTA */}
                Shop Now
              </Link>

              <Link className="btn btn-secondary" href="/products?sale=1&sort=price-asc"> {/* secondary CTA */}
                Explore Deals
              </Link>
            </div>
          </div>

          <div className="home-hero__cards" aria-label="Featured product highlights"> {/* static product cards */}
            {heroCards.map((card) => (
              <Link key={card.label} href={card.href} className="home-hero__card"> {/* single hero card */}
                <Image src={card.image} alt="" className="home-hero__card-img" loading="lazy" /> {/* defer supporting card images */}
                <div className="home-hero__card-body"> {/* card text */}
                  <span className="home-hero__card-label">{card.label}</span>
                  <h2 className="home-hero__card-title">{card.title}</h2>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default Banner;
