"use client"

import Image from "next/image"
import Link from "next/link"
import { usePathname, useSearchParams } from "next/navigation"
import { categoryCards } from "@/features/products/data/categories"
import { focusRingClass, getNavLinkClassName } from "./header-tools"
import SearchDrawer from "./SearchDrawer"

const dropdownClassName =
  "pointer-events-none fixed left-0 right-0 top-[var(--header-total-h)] z-50 hidden rounded-b-lg border-t border-[color:var(--app-border)] bg-[color:var(--app-surface)] p-4 text-[color:var(--app-text)] shadow-lg invisible opacity-0 transition-opacity md:block group-hover:pointer-events-auto group-hover:visible group-hover:opacity-100 group-focus-within:pointer-events-auto group-focus-within:visible group-focus-within:opacity-100" // shared desktop panel

const NavbarCategories = () => {
  const pathname = usePathname()
  const searchParams = useSearchParams()

  // The active state here uses both path and query values.
  // That lets "/products" and "/products?sale=1" light up different nav items.
  const isOnProducts = pathname === "/products" // products page check
  const isSaleActive = isOnProducts && searchParams.get("sale") === "1" // sale tab state
  const isProductsActive = isOnProducts && !isSaleActive // normal products tab state

  return (
    <nav className="flex min-w-0 flex-1 items-center overflow-x-auto no-scrollbar" aria-label="Primary navigation">
      <div className="header-nav-bar flex min-w-max items-stretch gap-0 pr-0">
        {/* Each top-level item keeps its own dropdown content with it.
            That way hover and keyboard focus open the matching panel only. */}
        <div className="group relative flex items-stretch">
          <Link href="/products" className={`header-nav-bar__item header-nav-bar__link ${getNavLinkClassName(isProductsActive)} ${focusRingClass}`}>
            <span className="nav-link__label">Products</span>
          </Link>
          <div className={dropdownClassName}>
            <div className="mb-2 u-text-sm text-muted">Shop by category</div>
            <div className="grid grid-cols-2 gap-3">
              {categoryCards.slice(0, 4).map((card) => (
                <Link key={card.id} href={card.href} className={`flex items-center gap-3 rounded-md p-2 hover:bg-[color:var(--app-surface-alt)] ${focusRingClass}`}>
                  <Image src={card.img} alt="" width={40} height={40} className="h-10 w-10 rounded object-cover" />
                  <span className="u-font-medium">{card.label}</span>
                </Link>
              ))}
            </div>
            <div className="mt-3">
              <Link href="/products" className={`u-text-sm text-brand-orange hover:underline ${focusRingClass}`}>View all products →</Link>
            </div>
          </div>
        </div>

        <div className="group relative flex items-stretch">
          <Link href="/products?sale=1&sort=price-asc" className={`header-nav-bar__item header-nav-bar__link ${getNavLinkClassName(isSaleActive)} ${focusRingClass}`}>
            <span className="nav-link__label">Best Deals</span>
          </Link>
          <div className={dropdownClassName}>
            <div className="mb-2 u-text-sm text-muted">Deals you might like</div>
            <div className="grid grid-cols-2 gap-3">
              <Link href="/products?sale=1&sort=price-asc" className={`rounded-md p-2 u-font-medium hover:bg-[color:var(--app-surface-alt)] ${focusRingClass}`}>All Deals</Link>
              {categoryCards.slice(0, 3).map((card) => (
                <Link key={card.id} href={`${card.href}&sale=1&sort=price-asc`} className={`rounded-md p-2 hover:bg-[color:var(--app-surface-alt)] ${focusRingClass}`}>
                  {card.label} Deals
                </Link>
              ))}
            </div>
          </div>
        </div>

        <div className="ml-2 shrink-0">
          <SearchDrawer />
        </div>
      </div>
    </nav>
  )
}

export default NavbarCategories
