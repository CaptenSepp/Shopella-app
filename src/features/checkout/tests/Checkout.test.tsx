import { beforeEach, describe, expect, it, vi } from "vitest"
import { screen, waitFor } from "@testing-library/react"
import userEvent from "@testing-library/user-event"
import { createOrder, startOrderPayment } from "@/features/orders/services"
import { buildItem, renderCheckoutWithStore } from "./checkout-test-tools"

const navigateMock = vi.fn() // capture navigation calls

vi.mock("react-router-dom", async () => {
  const actual = await vi.importActual<typeof import("react-router-dom")>("react-router-dom")
  return { ...actual, useNavigate: () => navigateMock } // replace navigation only
})

vi.mock("@/features/orders/services", () => ({
  createOrder: vi.fn(), // mock order creation
  startOrderPayment: vi.fn(),
}))

beforeEach(() => {
  navigateMock.mockClear()
  vi.mocked(createOrder).mockReset()
  vi.mocked(startOrderPayment).mockReset()
})

describe("Checkout validation", () => {
  it("blocks submission when required fields are missing", async () => {
    const user = userEvent.setup()
    const { store } = renderCheckoutWithStore([buildItem()])
    await user.click(screen.getByRole("button", { name: /place order/i }))
    expect(screen.queryByText("Full name is required.")).not.toBeInTheDocument()
    expect(screen.getByText("Address is required.")).toBeInTheDocument()
    expect(store.getState().cart.items).toHaveLength(1)
    expect(navigateMock).not.toHaveBeenCalled()
  })
})

describe("Checkout success path", () => {
  it("clears cart and navigates to confirmation on submit", async () => {
    const user = userEvent.setup()
    vi.mocked(createOrder).mockResolvedValueOnce({ id: "order_123", createdAt: new Date().toISOString(), customer: { name: "Ada Lovelace", email: "ada@example.com", address: "123 Long Street" }, items: [{ id: 202, title: "Checkout Item", price: 20, quantity: 1 }], totals: { subtotal: 20, shipping: 4.99, total: 24.99 }, status: "pending", statusHistory: [] })
    vi.mocked(startOrderPayment).mockImplementationOnce(async (order) => order)
    const { store } = renderCheckoutWithStore([buildItem()])
    await user.type(screen.getByLabelText("Address"), "123 Long Street")
    await user.click(screen.getByRole("button", { name: /place order/i }))
    await waitFor(() => { expect(store.getState().cart.items).toHaveLength(0); expect(navigateMock).toHaveBeenCalledWith("/order-confirmation?orderId=order_123", { replace: true, state: { order: expect.objectContaining({ id: "order_123" }) } }) })
  })

  it("keeps the cart when order creation fails", async () => {
    const user = userEvent.setup()
    vi.mocked(createOrder).mockRejectedValueOnce(new Error("Stock changed."))
    const { store } = renderCheckoutWithStore([buildItem()])
    await user.type(screen.getByLabelText("Address"), "123 Long Street")
    await user.click(screen.getByRole("button", { name: /place order/i }))
    expect(await screen.findByText("Stock changed.")).toBeInTheDocument()
    expect(store.getState().cart.items).toHaveLength(1)
  })
})
