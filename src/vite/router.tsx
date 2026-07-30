import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
} from "react-router-dom";
import { lazy, Suspense, type ComponentType, type LazyExoticComponent } from "react";
import Layout from "@/vite/layouts/RootLayout";
import ErrorPage from "@/vite/pages/ErrorPage";
import RequireAuth from "@/vite/auth/RequireAuth";
import RouteLoadingState from "@/components/ui/RouteLoadingState";

const About = lazy(() => import("@/vite/pages/About"))
const Admin = lazy(() => import("@/features/admin/AdminPage"))
const Account = lazy(() => import("@/vite/pages/Account"))
const Cart = lazy(() => import("@/vite/pages/Cart"))
const Checkout = lazy(() => import("@/vite/pages/Checkout"))
const Home = lazy(() => import("@/vite/pages/Home"))
const LoginPage = lazy(() => import("@/vite/pages/Login"))
const NotFoundPage = lazy(() => import("@/vite/pages/NotFound"))
const OrderConfirmation = lazy(() => import("@/vite/pages/OrderConfirmation"))
const OrdersPage = lazy(() => import("@/vite/pages/Orders"))
const ProductDetails = lazy(() => import("@/vite/pages/ProductDetails"))
const ProductsPage = lazy(() => import("@/vite/pages/Products"))
const Retailers = lazy(() => import("@/features/retailers/pages/Retailers"))
const Wishlist = lazy(() => import("@/vite/pages/Wishlist"))

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
        <Route path="admin" element={page(Admin)} />
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

