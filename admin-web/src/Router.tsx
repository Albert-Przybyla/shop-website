import { createBrowserRouter, Navigate } from "react-router-dom";
import HomePage from "./pages/app/HomePage.tsx";
import LoginPage from "./pages/LoginPage.tsx";
import MainLayout from "./layouts/MainLayout.tsx";
import OrdersPage from "./pages/app/OrdersPage.tsx";
import ProductsPage from "./pages/app/ProductsPage.tsx";
import SizePage from "./pages/app/SizePage.tsx";
import DeliveryMethodPage from "./pages/app/DeliveryMethodPage.tsx";
import AdminsPage from "./pages/app/AdminsPage.tsx";
import CodesPage from "./pages/app/CodesPage.tsx";

const router = createBrowserRouter([
  {
    path: "/",
    element: <LoginPage />,
  },
  {
    path: "/app",
    element: <MainLayout />,
    children: [
      {
        index: true,
        element: <Navigate to="/app/home" />,
      },
      {
        path: "home",
        element: <HomePage />,
        handle: { title: "HOME", backPath: null },
      },
      {
        path: "orders",
        element: <OrdersPage />,
        handle: { title: "HOME", backPath: null },
      },
      {
        path: "products",
        element: <ProductsPage />,
        handle: { title: "HOME", backPath: null },
      },
      {
        path: "sizes",
        element: <SizePage />,
        handle: { title: "HOME", backPath: null },
      },
      {
        path: "delivery-methods",
        element: <DeliveryMethodPage />,
        handle: { title: "HOME", backPath: null },
      },
      {
        path: "codes",
        element: <CodesPage />,
        handle: { title: "HOME", backPath: null },
      },
      {
        path: "admins",
        element: <AdminsPage />,
        handle: { title: "HOME", backPath: null },
      },
    ],
  },
]);
export default router;
