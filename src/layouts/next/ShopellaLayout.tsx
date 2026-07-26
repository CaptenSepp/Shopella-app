import type { ReactNode } from "react"
import AssistantFabLoader from "./AssistantFabLoader"
import Footer from "./Footer"
import Header from "./Header"
import Main from "./Main"

const ShopellaLayout = ({ children }: { children: ReactNode }) => (
  <div className="layout">
    <a href="#main-content" className="skip-link">Skip to main content</a>
    <Header /> {/* site header */}

    <Main>{children}</Main>
    <Footer /> {/* site footer */}
    <AssistantFabLoader />
  </div>
)

export default ShopellaLayout
