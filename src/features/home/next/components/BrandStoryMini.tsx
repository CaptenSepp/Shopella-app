import philosophyImg from "@/assets/images/Banner-philosophy.png"; // philosophy image

const BrandStoryMini = () => ( // condensed story section
  <section className="brand-mini"> {/* full-width section wrapper */}
    <div className="brand-mini__card"> {/* actual philosophy card */}
      <div className="brand-mini__text"> {/* text column */}
        <div className="mb-1 u-text-white">Everyday goods, chosen with care.</div> {/* mission line */}
        <p className="brand-mini__body">
          We keep the catalog focused and the quality high so shopping stays simple.
          Our team is obsessed with value, speed, and honest service.
        </p>
        <a className="brand-mini__link" href="/about">Learn more →</a> {/* about link */}
      </div>
      <div className="brand-mini__media"> {/* image column */}
        <img src={philosophyImg} alt="Our Philosophy" className="brand-mini__image" loading="lazy" decoding="async" /> {/* defer this story image */}
      </div>
    </div>
  </section>
);

export default BrandStoryMini;
