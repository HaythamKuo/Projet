import { useEffect } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import ProcessLoader from "../styles/UI/ProcessLoader";

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
  DeleteCart,
  CartToSave,
} from "../styles/CartDrawer.style";
import QuantityAmount from "../styles/UI/QuantityAmount";

import { useSelector, useDispatch } from "react-redux";
import { fetchGoods } from "../store/thunks/fetchGoods";
import { closeCart } from "../store/slices/cartSlice";

function CartDrawer() {
  const dispatch = useDispatch();
  const location = useLocation();
  const navigate = useNavigate();

  const {
    isOpen,
    items: prods,
    isLoading,
    error: err,
  } = useSelector((state) => state.cart);

  const { userInfo } = useSelector((state) => state.auth);
  const isLogined = !!userInfo?._id;

  function handleLogin() {
    dispatch(closeCart());
    navigate("/auth", { state: { from: location.pathname, fromCart: true } });
  }

  //用於esc and 點擊陰影就能消失的函式
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
    return () => {
      window.removeEventListener("keydown", keyDown);
      document.body.style.overflow = "";
    };
  }, [dispatch, isOpen]);
  useEffect(() => {
    if (!isLogined || !isOpen) return; // 只有登入才 fetch
    const fetchData = async () => {
      try {
        await dispatch(fetchGoods()).unwrap();
      } catch (error) {
        //toast.error(error || "載入失敗");
        console.log(error);
      }
    };
    fetchData();
  }, [dispatch, isLogined, isOpen]);

  useEffect(() => {
    if (isOpen && location.pathname.startsWith("/auth")) {
      dispatch(closeCart());
    }
  }, [dispatch, isOpen, location.pathname]);

  useEffect(() => {
    //有必要寫成這樣嗎？
    if (!err) return;
    const toastId = "cart-fetch-error";
    if (!toast.isActive(toastId)) {
      toast.error(err.message || "載入失敗", { toastId });
    }
  }, [err]);

  if (isLoading) return <ProcessLoader />;

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
              {Array.isArray(prods?.items) && prods.items.length === 0 && (
                <>
                  <NoProd />
                  <NoProdSpan>看來是還沒購物喔</NoProdSpan>
                </>
              )}

              {!isLogined && (
                <>
                  <RemindToLoginSpan>
                    如果要購物請先登入會員喔！
                  </RemindToLoginSpan>

                  {/* <RemindToLoginBtn
                    onClick={() =>
                      navigate("/auth", {
                        state: { from: location.pathname, fromCart: true },
                      })
                    }
                  >
                    前去登入
                  </RemindToLoginBtn> */}

                  <RemindToLoginBtn onClick={handleLogin}>
                    前去登入
                  </RemindToLoginBtn>
                </>
              )}
            </DefaultBox>
            {isLogined
              ? prods?.items?.map((item) => (
                  <ItemsContainer key={item._id}>
                    <div className="thumbNailWrapper">
                      <img
                        src={item.productId.images[0].url}
                        alt={item.productId.images[0].alt}
                      />
                    </div>
                    <div className="influxInfo">
                      <div className="influxInfo-top">
                        <span>{item.productId.name}</span>
                        <span>{item.unitPrice}</span>
                      </div>
                      <div className="influxInfo-center">
                        <DeleteCart />
                        <CartToSave />
                      </div>
                      <div className="influxInfo-bottom">
                        <span className="influxInfo-bottom_span">
                          S x {item.selectedSizes["S"]}
                        </span>
                        <span className="influxInfo-bottom_span">
                          M x {item.selectedSizes["M"]}
                        </span>
                        <span className="influxInfo-bottom_span">
                          L x {item.selectedSizes["L"]}
                        </span>
                      </div>
                    </div>
                  </ItemsContainer>
                ))
              : ""}
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
