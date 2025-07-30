import { useEffect } from "react";
import { Link } from "react-router-dom";

import {
  Drawer,
  OverLay,
  CartContainer,
  CartTop,
  CartCenter,
  CartBottom,
  CloseBtn,
  CartQuantity,
  ItemsContainer,
  CheckBtn,
  NoProd,
  DefaultBox,
  NoProdSpan,
  RemindToLoginSpan,
  RemindToLoginBtn,
} from "../styles/CartDrawer.style";
import QuantityAmount from "../styles/UI/QuantityAmount";

import { useSelector, useDispatch } from "react-redux";
import { closeCart } from "../store/slices/cartSlice";

function CartDrawer() {
  const dispatch = useDispatch();

  const { userInfo } = useSelector((state) => state.auth);
  const { isOpen } = useSelector((state) => state.cart);

  const isLogined = !!userInfo && userInfo.token;

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }

    if (!isOpen) return;

    const keyDown = (e) => {
      if (e.key === "Escape") {
        dispatch(closeCart());
      }
    };
    window.addEventListener("keydown", keyDown);
    () => {
      window.removeEventListener("keydown", keyDown);
      document.body.style.overflow = "";
    };
  }, [dispatch, isOpen]);

  return (
    <>
      {isOpen && <OverLay onClick={() => dispatch(closeCart())} />}

      <Drawer $open={isOpen}>
        <CartContainer>
          <CartTop>
            <CartQuantity>
              <h3>你的購物車</h3>
              <span>0</span>
            </CartQuantity>
            <CloseBtn onClick={() => dispatch(closeCart())} />
          </CartTop>
          <CartCenter>
            <DefaultBox>
              <NoProd />
              <NoProdSpan>看來是還沒購物喔</NoProdSpan>

              {!isLogined && (
                <>
                  <RemindToLoginSpan>
                    如果要購物請先登入會員喔！
                  </RemindToLoginSpan>
                  <Link to="/login">
                    <RemindToLoginBtn>前去登入</RemindToLoginBtn>
                  </Link>
                </>
              )}
            </DefaultBox>

            {/* <ItemsContainer>
              <div className="thumbNailWrapper">
                <img src="/cat-1.jpg" alt="default img" />
              </div>
              <div className="influxInfo">
                <div className="influxInfo-top">
                  <span>prod Name</span>

                  <span>prod price</span>
                </div>
                <div className="influxInfo-bottom">
                  <QuantityAmount />
                </div>
              </div>
            </ItemsContainer>

            <ItemsContainer>
              <div className="thumbNailWrapper">
                <img src="/cat-1.jpg" alt="default img" />
              </div>
              <div className="influxInfo">
                <div className="influxInfo-top">
                  <span>prod Name</span>

                  <span>prod price</span>
                </div>
                <div className="influxInfo-bottom">
                  <QuantityAmount />
                </div>
              </div>
            </ItemsContainer>
            <ItemsContainer>
              <div className="thumbNailWrapper">
                <img src="/cat-1.jpg" alt="default img" />
              </div>
              <div className="influxInfo">
                <div className="influxInfo-top">
                  <span>prod Name</span>

                  <span>prod price</span>
                </div>
                <div className="influxInfo-bottom">
                  <QuantityAmount />
                </div>
              </div>
            </ItemsContainer>

            <ItemsContainer>
              <div className="thumbNailWrapper">
                <img src="/cat-1.jpg" alt="default img" />
              </div>
              <div className="influxInfo">
                <div className="influxInfo-top">
                  <span>prod Name</span>

                  <span>prod price</span>
                </div>
                <div className="influxInfo-bottom">
                  <QuantityAmount />
                </div>
              </div>
            </ItemsContainer>

            <ItemsContainer>
              <div className="thumbNailWrapper">
                <img src="/cat-1.jpg" alt="default img" />
              </div>
              <div className="influxInfo">
                <div className="influxInfo-top">
                  <span>prod Name</span>

                  <span>prod price</span>
                </div>
                <div className="influxInfo-bottom">
                  <QuantityAmount />
                </div>
              </div>
            </ItemsContainer> */}
          </CartCenter>

          <CartBottom>
            <div className="check">
              <div className="check-subtotal">
                <span>總計</span>
                <span>$0</span>
              </div>

              <CheckBtn>結帳</CheckBtn>
            </div>
          </CartBottom>
        </CartContainer>
      </Drawer>
    </>
  );
}
export default CartDrawer;
