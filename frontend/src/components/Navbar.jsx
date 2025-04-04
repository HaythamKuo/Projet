import { useState } from "react";
import { Link } from "react-router-dom";
import { FaAlignJustify, FaXmark } from "react-icons/fa6";
import Image from "./Image";
import Switch from "../styles/UI/Switch";
import NavBtn from "../styles/UI/NavBtn";
import { MobileNav, NavContainer } from "../styles/nav.style";
import SplitText from "./reactBit/SplitText";
function Navbar({ onClick }) {
  const [open, setOpen] = useState(false);

  function handleOpen() {
    setOpen((pre) => !pre);
  }

  // 日夜模式切換

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
          <NavBtn name={"首頁"} />
          <NavBtn name={"關於"} />
          <NavBtn name={"服務"} />
          <Link to="login">
            <NavBtn name={"登入/註冊"} />
          </Link>
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
            <NavBtn ismobile={true} name={"服務"} />
            <NavBtn ismobile={true} name={"登入/註冊"} />
            <Switch onClick={onClick} />
          </MobileNav>
        </div>
      </div>
    </NavContainer>
  );
}
export default Navbar;
