import React, { lazy, Suspense } from "react"
import { NavLink } from "react-router-dom"
import Header from "@/layouts/Header"
import Main from "@/layouts/Main"

const AssistantFab = lazy(() => import("@/components/ui/AssistantFab")) // keep the AI interface in its own bundle

const Layout: React.FC = () => ( // app shell with header, main, footer
  <div className="layout">
    <a href="#main-content" className="skip-link">Skip to main content</a>
    <Header /> {/* site header */}

    <Main /> {/* route outlet */}
    <Footer /> {/* site footer */}

    <Suspense fallback={null}><AssistantFab /></Suspense>
  </div>
)

export default Layout

const Footer: React.FC = () => ( // inlined footer layout
  <footer className="footer">
    <section className="footer__section w-full py-8"> {/* footer info section */}
      <div className="footer__content u-text-white"> {/* split footer content */}
        <div className="footer__lead"> {/* left column */}
          <div>
            <p className="footer__brand">Shopella</p>
            <p className="footer__description">A clean portfolio storefront for discovering useful everyday products.</p>
          </div>
        </div>
        <div className="footer__links-wrap"> {/* working internal links */}
          <p className="footer__note">Explore Shopella</p>
          <div className="footer__links u-text-sm">
            <NavLink to="/products">All products</NavLink>
            <NavLink to="/products?cat=beauty">Beauty</NavLink>
            <NavLink to="/products?cat=furniture">Furniture</NavLink>
            <NavLink to="/wishlist">Wishlist</NavLink>
            <NavLink to="/orders">Orders</NavLink>
            <NavLink to="/about">About</NavLink>
          </div>
        </div>
      </div>
    </section>
    <nav className="footer-nav" aria-label="Footer navigation">
      <NavLink to="/" className={({ isActive }) => isActive ? "nav-link nav-link-active" : "nav-link"}>Home</NavLink>
      <NavLink to="/products" className={({ isActive }) => isActive ? "nav-link nav-link-active" : "nav-link"}>Products</NavLink>
      <NavLink to="/cart" className={({ isActive }) => isActive ? "nav-link nav-link-active" : "nav-link"}>Cart</NavLink>
      <NavLink to="/wishlist" className={({ isActive }) => isActive ? "nav-link nav-link-active" : "nav-link"}>Wishlist</NavLink>
      <NavLink to="/about" className={({ isActive }) => isActive ? "nav-link nav-link-active" : "nav-link"}>About</NavLink>
    </nav>
    <div className="footer__meta">&copy; {new Date().getFullYear()} Shopella · Portfolio project</div>
  </footer>
)
