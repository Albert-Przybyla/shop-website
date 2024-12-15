import { createBrowserRouter, Navigate } from "react-router-dom";
import HomePage from "./pages/app/HomePage.tsx";
import LoginPage from "./pages/LoginPage.tsx";
import MainLayout from "./layouts/MainLayout.tsx";

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
    ],
  },
]);
export default router;
