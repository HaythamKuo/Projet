import { useState } from "react";
import GlobalStyle from "./styles/GlobalReset";
import { ThemeProvider } from "styled-components";
import { LayoutContainer } from "./styles/layout.style";
import { darkTheme, lightTheme } from "./styles/theme";

import Navbar from "./components/Navbar";

function App() {
  const [theme, setTheme] = useState("light");

  function toggleTheme() {
    setTheme((preTheme) => (preTheme === "light" ? "dark" : "light"));
  }

  return (
    <ThemeProvider theme={theme === "light" ? lightTheme : darkTheme}>
      <LayoutContainer>
        <Navbar onClick={toggleTheme} />
      </LayoutContainer>
      <GlobalStyle />
    </ThemeProvider>
  );
}

export default App;
