import { Outlet } from "react-router-dom";
import { CartProvider } from "./hooks/CreatCart";
import Footer from "./components/Footer";

import { ContentContainer } from "./styles/nav.style";

import Navbar from "./components/Navbar";
import { CopyRight, CopyRightContainer } from "./styles/Footer.style";

function App({ toggleTheme }) {
  return (
    <>
      <CartProvider>
        <Navbar onClick={toggleTheme} />

        <ContentContainer>
          <Outlet />
          <Footer />
          <CopyRightContainer>
            <CopyRight />
            <span>this.Haytham. All rights reserved</span>
          </CopyRightContainer>
        </ContentContainer>
      </CartProvider>
    </>
  );
}

export default App;
