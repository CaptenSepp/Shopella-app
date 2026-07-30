"use client"

import Link from "next/link"
import type { ProductLinkProps } from "@/features/products/components/ProductCard"

const NextLink = (props: ProductLinkProps) => {
  return <Link {...props} />
}

export default NextLink
