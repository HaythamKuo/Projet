import { Outlet } from "react-router-dom";
import { LayoutContainer } from "./styles/layout.style";
//import { darkTheme, lightTheme } from "./styles/theme";
import { ContentContainer } from "./styles/nav.style";

import Navbar from "./components/Navbar";
//import Switch from "./styles/UI/Switch";

function App({ toggleTheme }) {
  return (
    <LayoutContainer>
      <Navbar onClick={toggleTheme} />
      <ContentContainer>
        <Outlet />
      </ContentContainer>
    </LayoutContainer>
  );
}

export default App;
