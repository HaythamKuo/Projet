import { useEffect } from "react";
import { useCart } from "../hooks/testCart";
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
} from "../styles/CartDrawer.style";
import QuantityAmount from "../styles/UI/QuantityAmount";
function CartDrawer() {
  const { isOpen, setIsOpen } = useCart();

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }

    if (!isOpen) return;

    const keyDown = (e) => {
      if (e.key === "Escape") {
        setIsOpen(false);
      }
    };
    window.addEventListener("keydown", keyDown);
    () => {
      window.removeEventListener("keydown", keyDown);
      document.body.style.overflow = "";
    };
  }, [isOpen, setIsOpen]);

  return (
    <>
      {isOpen && <OverLay onClick={() => setIsOpen(false)} />}

      <Drawer open={isOpen}>
        <CartContainer>
          <CartTop>
            <CartQuantity>
              <h3>你的購物車</h3>
              <span>0</span>
            </CartQuantity>
            <CloseBtn onClick={() => setIsOpen(false)} />
          </CartTop>
          <CartCenter>
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
