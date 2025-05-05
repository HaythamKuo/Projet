import { Outlet } from "react-router-dom";
import Footer from "./components/Footer";
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
      <Footer />
    </LayoutContainer>
  );
}

export default App;
