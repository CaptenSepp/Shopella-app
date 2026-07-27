import { ArrowUpRight } from "lucide-react"
import { Link } from "react-router-dom"

interface CategoryCardProps {
  id: string;
  img: string;
  label: string;
  href: string;
}

interface Props {
  cards: CategoryCardProps[];
}

const CategoryGridCard = ({ img, label, href }: CategoryCardProps) => (
  <Link to={href} className="category-card">
    <img src={img} alt="" className="category-card__image" loading="lazy" decoding="async" />
    <span className="category-card__content">
      <span className="category-card__title">{label}</span>
      <ArrowUpRight size={20} aria-hidden="true" />
    </span>
  </Link>
)

const CategoryGrid = ({ cards }: Props) => (
  <section className="grid__cards grid__cards--two-cols" aria-label="Shop by category">
    {cards.map((card) => (
      <CategoryGridCard key={card.id} {...card} />
    ))}
  </section>
)

export default CategoryGrid