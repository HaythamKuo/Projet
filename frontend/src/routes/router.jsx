import { createBrowserRouter, Outlet } from "react-router-dom";
import App from "../App";
import HomePage from "./HomePage";
import LoginPage from "./LoginPage";
import RegisterPage from "./RegisterPage";
import AllProductsPage from "./AllProductsPage";
import ProdPage from "../components/ProdPage";

export const createRouter = (toggleTheme) => {
  return createBrowserRouter([
    {
      path: "/",
      element: <App toggleTheme={toggleTheme} />,
      children: [
        {
          index: true,
          element: <HomePage />,
        },
        {
          path: "login",
          element: <LoginPage />,
        },
        {
          path: "register",
          element: <RegisterPage />,
        },
        {
          path: "products",
          element: <Outlet />,
          children: [
            { index: true, element: <AllProductsPage /> },
            { path: ":prodID", element: <ProdPage /> },
          ],
        },
      ],
    },
  ]);
};
