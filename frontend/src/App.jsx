import { Outlet } from "react-router-dom";
import CartDrawer from "./components/CartDrawer";
import Footer from "./components/Footer";

//import { ContentContainer } from "./styles/nav.style";
import { ContentContainer, LayoutWrapper, MainContent } from "./styles/index";

import Navbar from "./components/Navbar";
import { CopyRight, CopyRightContainer } from "./styles/Footer.style";
import { ToastContainer } from "react-toastify";

function App({ toggleTheme }) {
  return (
    <>
      <ToastContainer
        position="top-right" // 通知顯示位置，可選 top-left, top-center, bottom-left...
        autoClose={3000} // 自動關閉時間 (ms)，設為 false 則不自動關閉
        hideProgressBar={false} // 是否隱藏進度條
        newestOnTop={false} // 最新通知是否顯示在最上層
        closeOnClick // 點擊後是否關閉
        rtl={false} // 是否右-to-左排版 (阿拉伯語等)
        pauseOnFocusLoss // 搜尋到視窗失去焦點時是否暫停計時
        draggable // 是否可以拖動
        pauseOnHover // 滑鼠移至通知時是否暫停計時
        theme="colored" // 佈景：light, dark, colored
      />
      <LayoutWrapper>
        <Navbar onClick={toggleTheme} />

        <ContentContainer>
          <MainContent>
            <CartDrawer />
            <Outlet />
          </MainContent>

          <Footer />
          <CopyRightContainer>
            <CopyRight />
            <span>this.Haytham. All rights reserved</span>
          </CopyRightContainer>
        </ContentContainer>
      </LayoutWrapper>
    </>
  );
}

export default App;
