"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { isPathActive } from "./header/header-tools"

const Footer = () => {
  const pathname = usePathname()
  const getLinkClassName = (href: string) =>
    `nav-link${isPathActive(pathname, href) ? " nav-link-active" : ""}`

  return (
    <footer className="footer">
      <section className="footer__section w-full py-8">
        <div className="footer__content u-text-white">
          <div className="footer__lead">
            <div>
              <p className="footer__brand">Shopella</p>
              <p className="footer__description">A clean portfolio storefront for discovering useful everyday products.</p>
            </div>
          </div>
          <div className="footer__links-wrap">
            <p className="footer__note">Explore Shopella</p>
            <div className="footer__links u-text-sm">
              <Link href="/products">All products</Link>
              <Link href="/products?cat=beauty">Beauty</Link>
              <Link href="/products?cat=furniture">Furniture</Link>
              <Link href="/wishlist">Wishlist</Link>
              <Link href="/orders">Orders</Link>
              <Link href="/about">About</Link>
            </div>
          </div>
        </div>
      </section>
      <nav className="footer-nav" aria-label="Footer navigation">
        <Link href="/" className={getLinkClassName("/")}>Home</Link>
        <Link href="/products" className={getLinkClassName("/products")}>Products</Link>
        <Link href="/cart" className={getLinkClassName("/cart")}>Cart</Link>
        <Link href="/wishlist" className={getLinkClassName("/wishlist")}>Wishlist</Link>
        <Link href="/about" className={getLinkClassName("/about")}>About</Link>
      </nav>
      <div className="footer__meta">&copy; {new Date().getFullYear()} Shopella · Portfolio project</div>
    </footer>
  )
}

export default Footer
