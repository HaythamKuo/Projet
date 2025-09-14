import { createBrowserRouter, Outlet } from "react-router-dom";

import App from "../App";
import HomePage from "./HomePage";
import AuthLayout from "./AuthLayout";
import LoginPage from "./LoginPage";
import RegisterPage from "./RegisterPage";
import AllProductsPage from "./AllProductsPage";
import ProdPage from "../components/ProdPage";
import PrivateRoute from "../components/PrivateRoute";
import CheckoutGuard from "../components/CheckoutGuard";
import Profile from "./ProfilePage";
import CreateProduct from "../components/CreateProduct";
import EditProduct from "../components/EditProduct";
import ErrPage from "./ErrPage";
import Checkout from "../components/CheckOut";
import Ecpay from "./Ecpay";
import SearchRespage from "./SearchRespage";

export const createRouter = (toggleTheme) => {
  return createBrowserRouter([
    {
      path: "/",
      element: <App toggleTheme={toggleTheme} />,
      errorElement: <ErrPage text="404 🥲 NOT 🥲 FOUND 🥲 " />,
      children: [
        {
          index: true,
          element: <HomePage />,
        },
        {
          path: "auth",
          element: <AuthLayout />,
          children: [
            { index: true, element: <LoginPage /> },
            { path: "register", element: <RegisterPage /> },
          ],
        },
        {
          path: "products",
          element: <Outlet />,
          children: [
            { index: true, element: <AllProductsPage /> },
            { path: ":prodid", element: <ProdPage /> },
          ],
        },
        { path: "search", element: <SearchRespage /> },

        {
          element: <PrivateRoute />,
          children: [
            {
              path: "profile",
              element: <Profile />,
            },
            {
              path: "checkout",
              element: (
                <CheckoutGuard>
                  <Checkout />
                </CheckoutGuard>
              ),
            },
            {
              path: "create-product",
              element: <CreateProduct />,
            },
            {
              path: "edit-product/:prodid",
              element: <EditProduct />,
            },
            {
              path: "ecpayresult",
              element: <Ecpay />,
            },
          ],
        },
      ],
    },
  ]);
};
