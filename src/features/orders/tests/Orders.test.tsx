import { describe, expect, it, vi } from "vitest"
import { render, screen } from "@testing-library/react"
import { Provider } from "react-redux"
import { configureStore } from "@reduxjs/toolkit"
import { MemoryRouter } from "react-router-dom"
import OrdersPage from "@/vite/pages/Orders"
import cartReducer from "@/features/cart/cartSlice"
import wishlistReducer from "@/features/wishlist/wishlistSlice"
import authReducer from "@/features/auth/authSlice"

const useOrdersMock = vi.fn()
vi.mock("@/features/orders/hooks", () => ({ useOrders: () => useOrdersMock() }))

const renderOrders = () => {
  const store = configureStore({
    reducer: { cart: cartReducer, wishlist: wishlistReducer, auth: authReducer },
    preloadedState: { cart: { items: [] }, wishlist: { items: [] }, auth: { user: { id: "u1", name: "Test User", email: "test@example.com" } } },
  })
  return render(<Provider store={store}><MemoryRouter><OrdersPage /></MemoryRouter></Provider>)
}

describe("OrdersPage", () => {
  it("renders orders for the signed-in user", () => {
    useOrdersMock.mockReturnValue({ data: [{ id: "order_abc", createdAt: new Date().toISOString(), customer: { name: "Test User", email: "test@example.com", address: "1 Street" }, items: [{ id: 1, title: "Order Item", price: 10, discountPercentage: 0, quantity: 2 }], totals: { subtotal: 20, shipping: 4.99, total: 24.99 } }], error: null, isLoading: false, refetch: vi.fn() })
    renderOrders()
    expect(screen.getByText("order_abc")).toBeInTheDocument()
    expect(screen.getByText("Order Item x 2")).toBeInTheDocument()
  })

  it("separates an empty account from an API failure", () => {
    useOrdersMock.mockReturnValue({ data: [], error: new Error("Request failed"), isLoading: false, refetch: vi.fn() })
    renderOrders()
    expect(screen.getByText("Orders could not be loaded")).toBeInTheDocument()
    expect(screen.queryByText("No orders yet")).not.toBeInTheDocument()
  })
})
