import { createBrowserRouter } from "react-router-dom";
import Root from "./Root";
import HomePage from "./HomePage";

export const createRouter = (toggleTheme) => {
  return createBrowserRouter([
    {
      path: "/",
      element: <Root toggleTheme={toggleTheme} />,
      children: [
        {
          index: true,
          element: <HomePage />,
        },
      ],
    },
  ]);
};
