import { useState } from "react";
import { FaAlignJustify, FaXmark } from "react-icons/fa6";
import Switch from "../styles/UI/Switch";
import { MobileNav, NavContainer } from "../styles/nav.style";

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
          <img src="/logo.png" alt="logo" />
          <span>Haytham</span>
        </div>

        <div className="navLinks">
          <a href="#home">首頁</a>
          <a href="#about">關於</a>
          <a href="#services">服務</a>
          <a href="#contact">聯絡我們</a>
          <Switch onClick={onClick} />
        </div>

        {/* phone rwd mode */}
        <div className="mobile">
          {open ? (
            <FaXmark onClick={handleOpen} />
          ) : (
            <FaAlignJustify onClick={handleOpen} />
          )}

          <MobileNav open={open}>menu</MobileNav>
        </div>
      </div>
    </NavContainer>
  );
}
export default Navbar;
