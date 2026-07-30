import { Link } from "react-router-dom"
import type { ProductLinkProps } from "@/features/products/components/ProductCard"

const ViteLink = ({ href, ...props }: ProductLinkProps) => {
  return <Link to={href} {...props} />
}

export default ViteLink
