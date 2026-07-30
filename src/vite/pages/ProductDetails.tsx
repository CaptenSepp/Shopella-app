import { Link, useParams } from 'react-router-dom'
import { useAppDispatch } from '@/app/store'
import { useProductById, useProducts } from '@/features/products/hooks'
import { addToCart } from '@/features/cart/cartSlice'
import { toggleWishlist } from '@/features/wishlist/wishlistSlice'
import { useToast } from '@/components/ui/toastContext'
import ProductPrice from '@/features/products/components/ProductPrice'
import type { Product } from '@/features/products/services'
import ProductGallery from '@/features/products/components/ProductGallery'
import RelatedProducts from '@/features/products/components/RelatedProducts'
import RouteLoadingState from '@/components/ui/RouteLoadingState'
import ViteLink from '@/vite/components/ViteLink'

const ProductDetails = () => {
  const { productId } = useParams<{ productId: string }>() // read id from URL
  const productIdNumber = Number(productId) // coerce to number for API hook

  if (!Number.isFinite(productIdNumber)) return <ProductDetailsState title="Product not found" message="This product address is not valid." /> // invalid route id

  return <ProductDetailsContent productIdNumber={productIdNumber} />
}

const ProductDetailsContent = ({ productIdNumber }: { productIdNumber: number }) => {
  const dispatch = useAppDispatch() // typed dispatch for cart/wishlist actions
  const { notify } = useToast() // toast helper
  const { data: product, isLoading, error, refetch } = useProductById(productIdNumber) // fetch product by id incl. retry
  const { data: products = [] } = useProducts()

  const handleRetry = () => {
    void refetch() // Retry the same product request when the user asks again.
  }

  const handleAddToCart = () => {
    if (!product || product.stock <= 0) return // Guard loaded data and sold-out items.
    dispatch(addToCart(product))
    notify('Added to cart', 'success')
  }

  const handleToggleWishlist = () => {
    if (!product) return // Keep the same safety check for the wishlist action too.
    dispatch(toggleWishlist(product))
    notify('Wishlist updated', 'info')
  }

  if (isLoading) return <RouteLoadingState label="Loading product..." /> // loading state
  if (error) {
    return <ProductDetailsState title="Product could not be loaded" message={error.message} onRetry={handleRetry} />
  }
  if (!product) return <ProductDetailsState title="Product not found" message="The requested product is unavailable." /> // missing data state

  const galleryImages = Array.from(new Set([product.thumbnail, ...product.images])).filter(Boolean)
  const relatedProducts = products.filter((item) => item.id !== product.id && item.category === product.category).slice(0, 4)

  return (
    <div className="product-details-page">
      <div className="product-details-page__back">
        <Link to="/products" className="app-text-link">
          Back to products
        </Link>
      </div>

      <div className="product-details-page__main">
        <ProductGallery images={galleryImages} title={product.title} />
        <ProductDetailsSummary
          product={product}
          onAddToCart={handleAddToCart}
          onToggleWishlist={handleToggleWishlist}
        />
      </div>
      <RelatedProducts LinkComponent={ViteLink} products={relatedProducts} />
    </div>
  )
}

const ProductDetailsState = ({ message, onRetry, title }: { message: string; onRetry?: () => void; title: string }) => (
  <div className="app-state-panel app-page-shell app-page-shell--center">
    <h1 className="u-text-2xl u-font-semibold">{title}</h1>
    <p className="text-muted">{message}</p>
    {onRetry ? <button type="button" className="btn btn-primary" onClick={onRetry}>Try again</button> : <Link to="/products" className="btn btn-primary">Browse products</Link>}
  </div>
)

type ProductDetailsSummaryProps = {
  product: Product
  onAddToCart: () => void
  onToggleWishlist: () => void
}

const ProductDetailsSummary = ({
  product,
  onAddToCart,
  onToggleWishlist,
}: ProductDetailsSummaryProps) => {
  const isOutOfStock = product.stock <= 0 // Match product card sold-out logic.

  return (
    <section className="product-details-summary">
      <p className="product-details-summary__category">{product.category}</p>
      <h1 className="product-details-summary__title">{product.title}</h1>
      <p className="product-details-summary__meta">{product.brand || 'Shopella selection'} · {product.rating.toFixed(1)} / 5</p>
      <p className="product-details-summary__description">{product.description}</p>
      <ProductPrice price={product.price} discountPercentage={product.discountPercentage} className="product-details-summary__price" />
      <p className={`stock-note ${isOutOfStock ? "stock-note--empty" : ""}`}>{isOutOfStock ? "Currently out of stock" : `${product.stock} available`}</p>

      <div className="product-details-summary__actions">
        <button className="btn btn-primary" onClick={onAddToCart} disabled={isOutOfStock}>
          {isOutOfStock ? 'Out of stock' : 'Add to Cart'}
        </button>
        <button className="btn btn-secondary" onClick={onToggleWishlist}>
          Wishlist
        </button>
      </div>
    </section>
  )
}

export default ProductDetails
