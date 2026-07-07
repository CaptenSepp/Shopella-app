import type { MouseEvent } from "react"
import { Star } from "lucide-react"
import { Link } from "react-router-dom"
import type { Product } from "@/features/products/services"
import ProductPrice from "@/features/products/components/ProductPrice"

type ProductMediaCardProps = {
  product: Product
  onClick: (event: MouseEvent<HTMLAnchorElement>) => void
}

const ProductMediaCard = ({ product, onClick }: ProductMediaCardProps) => {
  return (
    <Link
      to={`/products/${product.id}`}
      className="best-row__card card card--product"
      aria-label={`View ${product.title}`}
      draggable={false}
      onDragStart={(event) => event.preventDefault()} // Prevent browser drag image behavior on the card.
      onClick={onClick}
    >
      <div className="best-row__media"> {/* product image area */}
        <img src={product.thumbnail} alt="" className="best-row__image" draggable={false} /> {/* dynamic product image */}
      </div>
      <div className="best-row__content">
        <div className="best-row__name line-clamp-2">{product.title}</div>
        <div className="best-row__brand line-clamp-2">{product.category}</div>
        <div className="best-row__rating">
          <Star size={14} className="best-row__star" aria-hidden="true" />
          <span className="best-row__rating-text">{product.rating.toFixed(1)}</span>
        </div>
        <div className="best-row__footer"> {/* price and action row */}
          <ProductPrice price={product.price} discountPercentage={product.discountPercentage} className="best-row__price u-font-bold" />
          <span className="best-row__action" aria-hidden="true">View</span>
        </div>
      </div>
    </Link>
  )
}

export default ProductMediaCard
