import { useEffect, useRef, useState } from "react";
import { useLocation } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { AnimatePresence } from "framer-motion";

import {
  MobileNav,
  NavContainer,
  SearchIcon,
  CartIcon,
  IconContainer,
} from "../styles/nav.style";
import { FaAlignJustify, FaXmark } from "react-icons/fa6";
import Image from "./Image";
import Switch from "../styles/UI/Switch";
import NavBtn from "../styles/UI/NavBtn";
import SearchQuery from "./SearchQuery";

import SplitText from "./reactBit/SplitText";

import LoginDropDown from "./LoginDropDown";

import { toggleCart } from "../store/slices/cartSlice";

import useClickOutside from "../hooks/useClickOutside";

function Navbar({ onClick }) {
  const [open, setOpen] = useState(false);

  const dispatch = useDispatch();
  const { isOpen } = useSelector((state) => state.cart);

  const location = useLocation();
  const isCheckout = location.pathname === "/checkout";

  //搜索
  const [search, setSearch] = useState(false);
  const controlSearch = useRef(null);

  useClickOutside(controlSearch, () => setSearch(false));

  useEffect(() => {
    setSearch(false);
  }, [location.pathname]);

  //try out inert attribute
  useEffect(() => {
    const main = document.getElementById("page-content");
    if (!main) return;

    if (search || isOpen) {
      main.setAttribute("inert", "");
    } else {
      main.removeAttribute("inert");
    }
  }, [search, isOpen]);

  /**
   * handleOpen
   * @function 切換手機模式navbar
   */
  function handleOpen() {
    setOpen((pre) => !pre);
  }

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
          <NavBtn name="首頁" address="/" />
          <NavBtn name="關於" address="" />
          <NavBtn name="全部產品" address="products" />

          <LoginDropDown />

          <IconContainer>
            {!isCheckout && (
              <>
                <SearchIcon onClick={() => setSearch(true)} />
                <AnimatePresence>
                  {search && <SearchQuery ref={controlSearch} />}
                </AnimatePresence>
                <CartIcon onClick={() => dispatch(toggleCart())} />
              </>
            )}

            <Switch onClick={onClick} />
          </IconContainer>
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
