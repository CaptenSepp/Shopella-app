"use client"

import { Heart, Info, MapPin, ShoppingCart } from "lucide-react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { useEffect, useState } from "react"
import { useSelector } from "react-redux"
import type { RootState } from "@/app/store"
import { focusRingClass, getIconLinkClassName, isPathActive } from "./header-tools"
import LoginDrawer from "./LoginDrawer"
import ThemeToggle from "./ThemeToggle"

const NavbarIcons = ({ className = "" }: { className?: string }) => {
  const pathname = usePathname()
  const [isMounted, setIsMounted] = useState(false)
  const cartCount = useSelector((state: RootState) => state.cart.items.reduce((sum, item) => sum + (item.quantity ?? 0), 0)) // total cart quantity
  const wishCount = useSelector((state: RootState) => state.wishlist.items.length) // total wishlist count
  useEffect(() => setIsMounted(true), [])

  return (
    <div className={`header-icons-bar ${className}`.trim()}>
      <Link href="/retailers" aria-label="Open retailers map" className={`${getIconLinkClassName(isPathActive(pathname, "/retailers"))} ${focusRingClass}`}><MapPin size={20} /></Link>
      <Link href="/cart" aria-label="Open cart" className={`${getIconLinkClassName(isPathActive(pathname, "/cart"))} ${focusRingClass}`}>
        <span className="relative inline-flex"><ShoppingCart size={20} />{isMounted && cartCount > 0 && <span className="badge-counter">{cartCount}</span>}</span>
      </Link>
      <Link href="/wishlist" aria-label="Open wishlist" className={`${getIconLinkClassName(isPathActive(pathname, "/wishlist"))} ${focusRingClass}`}>
        <span className="relative inline-flex"><Heart size={20} />{isMounted && wishCount > 0 && <span className="badge-counter">{wishCount}</span>}</span>
      </Link>
      <Link href="/about" aria-label="Open about page" className={`${getIconLinkClassName(isPathActive(pathname, "/about"))} ${focusRingClass}`}><Info size={20} /></Link>
      <ThemeToggle />
      <LoginDrawer />
    </div>
  )
}

export default NavbarIcons
