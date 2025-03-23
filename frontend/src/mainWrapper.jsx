import { useState, useMemo } from "react";

import { RouterProvider } from "react-router-dom";
import { ThemeProvider } from "styled-components";
import GlobalStyle from "./styles/GlobalReset.jsx";
import { createRouter } from "./routes/router.jsx";

import { darkTheme, lightTheme } from "./styles/theme.js";

function MainWrapper() {
  const [theme, setTheme] = useState("light");

  function toggleTheme() {
    setTheme((preTheme) => (preTheme === "light" ? "dark" : "light"));
  }

  const router = useMemo(() => createRouter(toggleTheme), []);

  return (
    <ThemeProvider theme={theme === "light" ? lightTheme : darkTheme}>
      <GlobalStyle />
      <RouterProvider router={router} />
    </ThemeProvider>
  );
}

export default MainWrapper;
