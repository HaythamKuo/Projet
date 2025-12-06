import { useEffect, useRef, useState } from "react";
import { Link, useLocation, useMatch } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { AnimatePresence } from "framer-motion";

// import { toast } from "react-toastify";

import {
  MobileNav,
  NavContainer,
  SearchIcon,
  CartIcon,
  IconContainer,
  SideBar,
  CloseSideBar,
  LogoWrapper,
  Logo,
} from "../styles/nav.style";

// import Image from "./Image";
import LogoIcon from "../assets/logo.png";
import Switch from "../styles/UI/Switch";
import NavBtn from "../styles/UI/NavBtn";
import SearchQuery from "./SearchQuery";

import SplitText from "./reactBit/SplitText";

import LoginDropDown from "./LoginDropDown";

import { toggleCart } from "../store/slices/cartSlice";

import useClickOutside from "../hooks/useClickOutside";
import { useScrollBlock } from "../hooks/useScrollBlock";
import useObserverInnerWidth from "../hooks/useObserverInnerWidth";

import SideNavBar from "./SideNavBar";

function Navbar({ onClick }) {
  const [open, setOpen] = useState(false);
  const controllRwdNav = useRef(null);
  const { pathname } = useLocation();

  const isMobile = useObserverInnerWidth(768);
  const previousPath = useRef(pathname);

  const dispatch = useDispatch();
  // const { userInfo } = useSelector((state) => state.auth);

  const { isOpen } = useSelector((state) => state.cart);

  //管理pathname 控制部分網頁授權
  const hasCheckout = !!useMatch("/checkout");
  const hasCreateRoute = !!useMatch("/create-product");
  const hasEcpayRoute = !!useMatch("/ecpayresult");
  const hasEditRoute = !!useMatch("/edit-product/:id");

  const isIncludePathname =
    hasCheckout || hasCreateRoute || hasEcpayRoute || hasEditRoute;

  //關於搜索
  const [search, setSearch] = useState(false);
  const controlSearch = useRef(null);
  useClickOutside(controlSearch, () => setSearch(false));

  //關閉rwd 的sideNavBar
  useClickOutside(controllRwdNav, () => setOpen(false));

  const [blockScroll, allowScroll] = useScrollBlock(controlSearch);

  useEffect(() => {
    setSearch(false);
  }, [pathname]);

  useEffect(() => {
    if (search) {
      blockScroll();
    } else {
      allowScroll();
    }
  }, [search, blockScroll, allowScroll]);

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

  //監控視窗寬度且關閉navbar
  // useEffect(() => {
  //   const handleResize = () => setIsMobile(window.innerWidth < 768);
  //   window.addEventListener("resize", handleResize);

  //   return () => window.removeEventListener("resize", handleResize);
  // }, []);

  useEffect(() => {
    if (previousPath.current !== pathname && isMobile) {
      setOpen(false);
      previousPath.current = pathname;
    }
  }, [pathname, isMobile]);

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
        <Link to="/">
          <div className="logo">
            <LogoWrapper>
              <Logo src={LogoIcon} alt="logo" />
            </LogoWrapper>

            {/* <SplitText
              text="x 娃娃兵"
              className="text-2xl font-semibold text-center"
              delay={150}
              animationFrom={{ opacity: 0, transform: "translate3d(0,50px,0)" }}
              animationTo={{ opacity: 1, transform: "translate3d(0,0,0)" }}
              easing="easeOutCubic"
              threshold={0.2}
              rootMargin="-50px"
            /> */}
          </div>
        </Link>
        <div className="navLinks">
          <NavBtn name="首頁" address="/" />
          <NavBtn name="關於" address="" />
          <NavBtn name="全部產品" address="products" />

          <LoginDropDown />

          <IconContainer $position={!isIncludePathname}>
            {!isIncludePathname && (
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
        {!isIncludePathname && (
          <div className="mobileSearch">
            <SearchIcon onClick={() => setSearch(true)} />
          </div>
        )}

        <div className="mobile">
          {open ? (
            <CloseSideBar onClick={handleOpen} />
          ) : (
            <SideBar onClick={handleOpen} />
          )}

          <SideNavBar
            isIncludePathname={!isIncludePathname}
            onClick={onClick}
            open={open}
            setOpen={setOpen}
          />
        </div>
      </div>
    </NavContainer>
  );
}
export default Navbar;
