import { Outlet } from "react-router-dom";
import Footer from "./components/Footer";

import { ContentContainer } from "./styles/nav.style";

import Navbar from "./components/Navbar";
import { CopyRight, CopyRightContainer } from "./styles/Footer.style";

function App({ toggleTheme }) {
  return (
    <>
      <Navbar onClick={toggleTheme} />

      <ContentContainer>
        <Outlet />
        <Footer />
        <CopyRightContainer>
          <CopyRight />
          <span>this.Haytham. All rights reserved</span>
        </CopyRightContainer>
      </ContentContainer>
    </>
  );
}

export default App;
