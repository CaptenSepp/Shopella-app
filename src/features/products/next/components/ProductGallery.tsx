import { useState } from "react"

type ProductGalleryProps = { images: string[]; title: string }

const ProductGallery = ({ images, title }: ProductGalleryProps) => {
  const safeImages = images.filter(Boolean)
  const [selectedImage, setSelectedImage] = useState(safeImages[0] ?? "")

  return (
    <section className="product-gallery" aria-label={`${title} images`}>
      <div className="product-gallery__main">
        <img src={selectedImage} alt={title} className="product-gallery__main-image" fetchPriority="high" />
      </div>
      {safeImages.length > 1 ? (
        <div className="product-gallery__thumbnails">
          {safeImages.map((image, index) => (
            <button key={image} type="button" className={`product-gallery__thumbnail ${image === selectedImage ? "product-gallery__thumbnail--active" : ""}`} onClick={() => setSelectedImage(image)} aria-label={`Show image ${index + 1} of ${title}`} aria-pressed={image === selectedImage}>
              <img src={image} alt="" loading="lazy" />
            </button>
          ))}
        </div>
      ) : null}
    </section>
  )
}

export default ProductGallery
