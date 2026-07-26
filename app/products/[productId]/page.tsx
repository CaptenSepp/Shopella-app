import ProductDetails from "@/features/products/next/pages/ProductDetails"

type ProductDetailsRouteProps = {
  params: Promise<{ productId: string }>
}

export default async function ProductDetailsRoute({ params }: ProductDetailsRouteProps) {
  const { productId } = await params
  return <ProductDetails productId={productId} />
}
