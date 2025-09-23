import { useState, useMemo } from "react";

import { RouterProvider } from "react-router-dom";
import { ThemeProvider } from "styled-components";
import GlobalStyle from "./styles/GlobalReset.jsx";
import { createRouter } from "./routes/router.jsx";

import { darkTheme, lightTheme } from "./styles/theme.js";
import "react-toastify/dist/ReactToastify.css";

function setCookies(theme) {
  document.cookie = `theme=${theme}; max-age=60*60*24*7; path=/`;
}

function getCookies() {
  const match = document.cookie.match(/(?:^|;\s*)theme=([^;]*)/);
  return match ? match[1] : null;
}

function MainWrapper() {
  const [theme, setTheme] = useState(() => getCookies() || "light");

  function toggleTheme() {
    setTheme((preTheme) => {
      const nextTheme = preTheme === "light" ? "dark" : "light";
      setCookies(nextTheme);
      return nextTheme;
    });
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
