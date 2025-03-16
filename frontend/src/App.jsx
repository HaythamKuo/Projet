import { useState, useMemo } from "react";
import GlobalStyle from "./styles/GlobalReset";
import { ThemeProvider } from "styled-components";
import { RouterProvider } from "react-router-dom";
import { createRouter } from "./routes/router";
import { darkTheme, lightTheme } from "./styles/theme";

function App() {
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

export default App;
