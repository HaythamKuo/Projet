import { Outlet } from "react-router-dom";
import { LayoutContainer } from "./styles/layout.style";
import { ContentContainer } from "./styles/nav.style";

import Navbar from "./components/Navbar";

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
