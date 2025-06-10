import { useState } from "react";
import { Link } from "react-router-dom";

import { MobileNav, NavContainer } from "../styles/nav.style";
import { FaAlignJustify, FaXmark } from "react-icons/fa6";
import Image from "./Image";
import Switch from "../styles/UI/Switch";
import NavBtn from "../styles/UI/NavBtn";
import SplitText from "./reactBit/SplitText";
import { useCart } from "../hooks/testCart";
import LoginDropDown from "./loginDropDown";

function Navbar({ onClick }) {
  const [open, setOpen] = useState(false);

  /**
   * handleOpen
   * @function 切換手機模式navbar
   */
  function handleOpen() {
    setOpen((pre) => !pre);
  }

  // 日夜模式切換
  /**
   * useCart
   * 透過 @function {useCart} 切換購物車開關
   * @returns {Boolean} true/false
   */
  const { setIsOpen } = useCart();

  return (
    <NavContainer>
      <div className="navContent">
        <div className="logo">
          <Image src="/logo.png" alt="pics" w={48} h={48} />
          {/* <img src="https://ik.imagekit.io/tokujl07r/logo.png" alt="logo" /> */}
          <SplitText
            text="Haytham"
            className="text-2xl font-semibold text-center"
            delay={150}
            animationFrom={{ opacity: 0, transform: "translate3d(0,50px,0)" }}
            animationTo={{ opacity: 1, transform: "translate3d(0,0,0)" }}
            easing="easeOutCubic"
            threshold={0.2}
            rootMargin="-50px"
          />
        </div>
        <div className="navLinks">
          <Link to={"/"}>
            <NavBtn name={"首頁"} />
          </Link>
          <NavBtn name={"關於"} />
          <Link to="products">
            <NavBtn name={"全部產品"} />
          </Link>
          {/* <Link to="auth">
            <NavBtn name={"登入/註冊"} />
          </Link> */}

          <LoginDropDown />

          <NavBtn name="購物車" onClick={() => setIsOpen((pre) => !pre)} />
          <Switch onClick={onClick} />
        </div>
        {/* phone rwd mode */}

        <div className="mobile">
          {open ? (
            <FaXmark onClick={handleOpen} />
          ) : (
            <FaAlignJustify onClick={handleOpen} />
          )}

          <MobileNav open={open}>
            <NavBtn ismobile={true} name={"首頁"} />
            <NavBtn ismobile={true} name={"關於"} />
            <NavBtn ismobile={true} name={"全部產品"} />
            <NavBtn ismobile={true} name={"登入/註冊"} />
            <Switch onClick={onClick} />
          </MobileNav>
        </div>
      </div>
    </NavContainer>
  );
}
export default Navbar;
