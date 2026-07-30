import { Heart, House, Info, MapPin, ShoppingBag, ShoppingCart } from "lucide-react"
import { useSelector } from "react-redux"
import { NavLink } from "react-router-dom"
import { RootState } from "@/app/store"
import { focusRingClass, getIconLinkClassName } from "./header-tools"
import LoginDrawer from "./LoginDrawer"
import ThemeToggle from "./ThemeToggle"

type NavbarIconsProps = {
  className?: string
  mobile?: boolean
}

const NavbarIcons = ({ className = "", mobile = false }: NavbarIconsProps) => {
  const cartCount = useSelector((state: RootState) => state.cart.items.reduce((sum, item) => sum + (item.quantity ?? 0), 0))
  const wishCount = useSelector((state: RootState) => state.wishlist.items.length)

  if (mobile) {
    return (
      <nav className={`header-icons-bar ${className}`.trim()} aria-label="Mobile navigation">
        <NavLink to="/" end aria-label="Home" className={({ isActive }) => `${getIconLinkClassName(isActive)} header-icons-bar__link--mobile ${focusRingClass}`}>
          <House size={20} /><span className="header-icons-bar__label">Home</span>
        </NavLink>
        <NavLink to="/products" aria-label="Browse products" className={({ isActive }) => `${getIconLinkClassName(isActive)} header-icons-bar__link--mobile ${focusRingClass}`}>
          <ShoppingBag size={20} /><span className="header-icons-bar__label">Shop</span>
        </NavLink>
        <NavLink to="/cart" aria-label="Open cart" className={({ isActive }) => `${getIconLinkClassName(isActive)} header-icons-bar__link--mobile ${focusRingClass}`}>
          <span className="relative inline-flex"><ShoppingCart size={20} />{cartCount > 0 && <span className="badge-counter">{cartCount}</span>}</span><span className="header-icons-bar__label">Cart</span>
        </NavLink>
        <NavLink to="/wishlist" aria-label="Open wishlist" className={({ isActive }) => `${getIconLinkClassName(isActive)} header-icons-bar__link--mobile ${focusRingClass}`}>
          <span className="relative inline-flex"><Heart size={20} />{wishCount > 0 && <span className="badge-counter">{wishCount}</span>}</span><span className="header-icons-bar__label">Saved</span>
        </NavLink>
      </nav>
    )
  }

  return (
    <div className={`header-icons-bar ${className}`.trim()}>
      <NavLink to="/retailers" aria-label="Open retailers map" className={({ isActive }) => `${getIconLinkClassName(isActive)} ${focusRingClass}`}><MapPin size={20} /></NavLink>
      <NavLink to="/cart" aria-label="Open cart" className={({ isActive }) => `${getIconLinkClassName(isActive)} ${focusRingClass}`}>
        <span className="relative inline-flex"><ShoppingCart size={20} />{cartCount > 0 && <span className="badge-counter">{cartCount}</span>}</span>
      </NavLink>
      <NavLink to="/wishlist" aria-label="Open wishlist" className={({ isActive }) => `${getIconLinkClassName(isActive)} ${focusRingClass}`}>
        <span className="relative inline-flex"><Heart size={20} />{wishCount > 0 && <span className="badge-counter">{wishCount}</span>}</span>
      </NavLink>
      <NavLink to="/about" aria-label="Open about page" className={({ isActive }) => `${getIconLinkClassName(isActive)} ${focusRingClass}`}><Info size={20} /></NavLink>
      <ThemeToggle />
      <LoginDrawer />
    </div>
  )
}

export default NavbarIcons
