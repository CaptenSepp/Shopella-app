import { Link } from "react-router-dom";
import topBannerImg from "@/assets/images/Banner-top.png"; // top banner image
import beautyImg from "@/assets/images/beauty.jpg"; // static hero card image
import fragrancesImg from "@/assets/images/fragrances.jpg"; // static hero card image
import groceriesImg from "@/assets/images/groceries.jpg"; // static hero card image

const heroCards = [ // quick attention cards
  { label: "Best seller", title: "Beauty Edit", image: beautyImg, href: "/products?cat=beauty" },
  { label: "New arrival", title: "Fragrance Drop", image: fragrancesImg, href: "/products?cat=fragrances" },
  { label: "Top rated", title: "Daily Goods", image: groceriesImg, href: "/products?cat=groceries" },
];

const Banner = () => { // hero banner section
  return (
    <div className="home-hero-wrap"> {/* keep wrapper for layout consistency */}
      <section className="home-hero full-bleed"> {/* premium dark hero */}
        <img src={topBannerImg} alt="" className="home-hero__bg" aria-hidden="true" /> {/* subtle old hero image */}

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
              <Link className="btn btn-primary" to="/products"> {/* primary CTA */}
                Shop Now
              </Link>

              <Link className="btn btn-secondary" to="/products?sale=1&sort=price-asc"> {/* secondary CTA */}
                Explore Deals
              </Link>
            </div>
          </div>

          <div className="home-hero__cards" aria-label="Featured product highlights"> {/* static product cards */}
            {heroCards.map((card) => (
              <Link key={card.label} to={card.href} className="home-hero__card"> {/* single hero card */}
                <img src={card.image} alt="" className="home-hero__card-img" /> {/* card image */}
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
