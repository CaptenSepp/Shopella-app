export { focusRingClass } from "@/components/ui/focus-tools"

export const getNavLinkClassName = (isActive: boolean) =>
  `nav-link${isActive ? " nav-link-active" : ""}`

export const getIconLinkClassName = (isActive: boolean) =>
  `icon-button header-icons-bar__link transition cursor-pointer${isActive ? " header-icons-bar__link--active" : ""}`
