import { createBrowserRouter } from "react-router-dom";
import HomePage from "./HomePage";
import App from "../App";

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
      ],
    },
  ]);
};
