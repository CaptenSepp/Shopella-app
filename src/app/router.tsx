import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
} from "react-router-dom";
import { lazy, Suspense, type ComponentType, type LazyExoticComponent } from "react";
import Layout from "@/layouts/RootLayout";
import ErrorPage from "@/features/error/pages/ErrorPage";
import RequireAuth from "@/features/auth/RequireAuth";
import RouteLoadingState from "@/components/ui/RouteLoadingState";

const About = lazy(() => import("@/features/about/pages/About"))
const Account = lazy(() => import("@/features/account/pages/Account"))
const Cart = lazy(() => import("@/features/cart/pages/Cart"))
const Checkout = lazy(() => import("@/features/checkout/pages/Checkout"))
const Home = lazy(() => import("@/features/home/pages/Home"))
const LoginPage = lazy(() => import("@/features/auth/pages/Login"))
const NotFoundPage = lazy(() => import("@/features/error/pages/NotFound"))
const OrderConfirmation = lazy(() => import("@/features/checkout/pages/OrderConfirmation"))
const OrdersPage = lazy(() => import("@/features/orders/pages/Orders"))
const ProductDetails = lazy(() => import("@/features/products/pages/ProductDetails"))
const ProductsPage = lazy(() => import("@/features/products/pages/Products"))
const Retailers = lazy(() => import("@/features/retailers/pages/Retailers"))
const Wishlist = lazy(() => import("@/features/wishlist/pages/Wishlist"))

const page = (PageComponent: LazyExoticComponent<ComponentType>) => (
  <Suspense fallback={<RouteLoadingState />}><PageComponent /></Suspense>
)

const router = createBrowserRouter( // central route tree for the SPA
  createRoutesFromElements(
    <Route
      path="/"
      element={<Layout />} // shared layout shell for all pages
      errorElement={<ErrorPage />} // router-level error fallback
    >
      <Route
        index
        element={page(Home)} // home page
      />
      <Route
        path="products" // product listing
        element={page(ProductsPage)}
      />
      <Route
        path="products/:productId" // product details by id
        element={page(ProductDetails)}
      />
      <Route
        path="cart" // cart page
        element={page(Cart)}
      />
      <Route element={<RequireAuth />}>
        <Route path="checkout" element={page(Checkout)} />
        <Route path="account" element={page(Account)} />
        <Route path="orders" element={page(OrdersPage)} />
        <Route path="order-confirmation" element={page(OrderConfirmation)} />
      </Route>
      <Route
        path="wishlist" // wishlist page
        element={page(Wishlist)}
      />
      <Route
        path="about" // about page
        element={page(About)}
      />
      <Route
        path="retailers" // retailers map page
        element={page(Retailers)}
      />
      <Route
        path="*" // catch-all 404
        element={page(NotFoundPage)}
      />
      <Route
        path="login" // Supabase sign-in and registration page
        element={page(LoginPage)}
      />

    </Route>
  )
);

export default router; // RouterProvider consumes this instance
