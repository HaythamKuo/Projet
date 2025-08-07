import { useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
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
  IconBtn,
} from "../styles/CartDrawer.style";
//import QuantityAmount from "../styles/UI/QuantityAmount";

import { useSelector, useDispatch } from "react-redux";
import { fetchGoods } from "../store/thunks/fetchGoods";
import { deleteGood } from "../store/thunks/deleteGood";
import {
  closeCart,
  removeItem,
  restoreItem,
  selectCartItems,
} from "../store/slices/cartSlice";

function CartDrawer() {
  const dispatch = useDispatch();
  const location = useLocation();
  const navigate = useNavigate();

  const { isOpen, isLoading, error: err } = useSelector((state) => state.cart);

  const items = useSelector(selectCartItems);

  const { userInfo } = useSelector((state) => state.auth);
  const isLogined = !!userInfo?._id;

  const handleLogin = () => {
    dispatch(closeCart());
    navigate("/auth", { state: { from: location.pathname, fromCart: true } });
  };

  //處理刪除
  const handleDelete = async (item) => {
    dispatch(removeItem(item._id));
    console.log(item._id);

    try {
      await dispatch(deleteGood(item._id)).unwrap();
      toast.success("刪除成功");
    } catch (error) {
      dispatch(restoreItem(item));
      console.log(error);
      toast.error("刪除失敗");
    }
  };

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

  return (
    <>
      {isOpen && <OverLay onClick={() => dispatch(closeCart())} />}

      <Drawer $open={isOpen}>
        <CartContainer>
          {isLoading && (
            <>
              <ProcessLoader />
            </>
          )}
          <CartTop>
            <CartQuantity>
              <h3>你的購物車</h3>
              <span>0</span>
            </CartQuantity>
            <CloseBtn onClick={() => dispatch(closeCart())} />
          </CartTop>
          <CartCenter>
            <DefaultBox $isFlex={isLogined}>
              {Array.isArray(items) && items.length === 0 && (
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

                  <RemindToLoginBtn onClick={handleLogin}>
                    前去登入
                  </RemindToLoginBtn>
                </>
              )}
            </DefaultBox>

            {isLogined &&
              items.map((item) => (
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
                      <IconBtn
                        onClick={() => handleDelete(item)}
                        disabled={isLoading}
                      >
                        <DeleteCart />
                      </IconBtn>

                      <IconBtn disabled={isLoading}>
                        <CartToSave />
                      </IconBtn>
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
              ))}
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
