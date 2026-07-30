import OrdersPage from "@/features/orders/next/pages/Orders"
import AccountProfile from "@/features/account/components/AccountProfile"

const Account = () => (
  <>
    <div className="app-page-shell app-page-shell--wide account-page">
      <AccountProfile />
    </div>
    <OrdersPage />
  </>
)

export default Account
