import Image, { type StaticImageData } from "next/image";
import Link from "next/link"; // client-side navigation links

interface CategoryCardProps {
  id: string;
  img: string | StaticImageData;
  label: string;
  href: string;
}

interface Props {
  cards: CategoryCardProps[];
}

const CategoryGridCard = ({ img, label, href }: CategoryCardProps) => { // single category card
  return (
    <div className="relative group h-96 sm:h-[30rem] overflow-hidden rounded-lg"> {/* bigger cards (1.5x) */}
      <Image
        src={img}
        alt={label}
        className="w-full h-full object-cover transition duration-300 group-hover:brightness-110"
        fill
        sizes="(min-width: 640px) 50vw, 50vw"
      />
      <Link
        href={href}
        className="absolute left-1/2 bottom-4 -translate-x-1/2 btn btn-primary btn-sm "
      >
        {label}
      </Link>
    </div>
  );
};

const CategoryGrid = ({ cards }: Props) => ( // lays out cards in a two-column grid
  <section className="grid__cards grid__cards--two-cols">
    {cards.map((card) => (
      <CategoryGridCard key={card.id} {...card} />
    ))}
  </section>
);

export default CategoryGrid;
