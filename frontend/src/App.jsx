import { useState } from "react";
import { createGlobalStyle, ThemeProvider } from "styled-components";
import reset from "styled-reset";
import { LayoutContainer } from "./styles/layout.style";
import Switch from "./styles/UI/Switch";
import { darkTheme, lightTheme } from "./styles/theme";

const GlobalReset = createGlobalStyle`${reset}

html {
  font-size:62.5%;
}

body{
  background-color: ${({ theme }) => theme.colors.backGround};
  width:100vw;
  

}

`;

function App() {
  const [theme, setTheme] = useState("light");

  function toggleTheme() {
    setTheme((preTheme) => (preTheme === "light" ? "dark" : "light"));
  }

  return (
    <ThemeProvider theme={theme === "light" ? lightTheme : darkTheme}>
      <LayoutContainer>
        <GlobalReset />
        hello world
        <Switch onClick={toggleTheme} />
      </LayoutContainer>
    </ThemeProvider>
  );
}

export default App;
