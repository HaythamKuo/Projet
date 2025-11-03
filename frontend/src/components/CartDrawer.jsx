import { useEffect, useRef } from "react";
import { createPortal } from "react-dom";
import { useLocation, useNavigate } from "react-router-dom";

import { toast } from "react-toastify";

import ProcessLoader from "../styles/UI/ProcessLoader";
import useClickOutside from "../hooks/useClickOutside";
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

import { useSelector, useDispatch } from "react-redux";
import { useScrollBlock } from "../hooks/useScrollBlock";

import { fetchGoods } from "../store/thunks/fetchGoods";

import {
  closeCart,
  selectCartItems,
  cartTotalPrice,
} from "../store/slices/cartSlice";
import { useDeleteGood } from "../hooks/useDeleteGood";

function CartDrawer() {
  const controlCart = useRef(null);

  const dispatch = useDispatch();
  const location = useLocation();
  const navigate = useNavigate();

  const { isOpen, isLoading, error: err } = useSelector((state) => state.cart);

  const { userInfo } = useSelector((state) => state.auth);
  const items = useSelector(selectCartItems);
  const totalPrice = useSelector(cartTotalPrice);

  //購物車 → 限制滾動
  const [blockScroll, allowScroll] = useScrollBlock(controlCart);

  useEffect(() => {
    if (isOpen) blockScroll();
    else allowScroll();
  }, [isOpen, blockScroll, allowScroll]);

  //hook
  const { handleDelete } = useDeleteGood();
  useClickOutside(controlCart, () => {
    dispatch(closeCart());
  });

  useEffect(() => {
    if (!userInfo || !isOpen) return; // 只有登入才 fetch

    const fetchData = async () => {
      try {
        await dispatch(fetchGoods()).unwrap();
      } catch (error) {
        console.log(error);
      }
    };
    fetchData();
  }, [dispatch, userInfo, isOpen]);

  useEffect(() => {
    if (!err) return;
    const toastId = "cart-fetch-error";
    if (!toast.isActive(toastId)) {
      toast.error(err.message || "載入失敗", { toastId });
    }
  }, [err]);

  return createPortal(
    <>
      {isOpen && <OverLay $open={isOpen} />}

      {/* <OverLay $open={isOpen} onClick={() => dispatch(closeCart())} /> */}
      <Drawer $open={isOpen} ref={controlCart} className="outter">
        <CartContainer className="inner">
          {isLoading && (
            <>
              <ProcessLoader />
            </>
          )}
          <CartTop>
            <CartQuantity>
              <h3>你的購物車</h3>
              <span>{items.length || 0}</span>
            </CartQuantity>
            <CloseBtn onClick={() => dispatch(closeCart())} />
          </CartTop>
          <CartCenter>
            <DefaultBox $isFlex={!!userInfo}>
              {Array.isArray(items) && items.length === 0 && (
                <>
                  <NoProd />

                  <NoProdSpan>看來是還沒購物喔</NoProdSpan>
                </>
              )}

              {!userInfo && (
                <>
                  <RemindToLoginSpan>
                    如果要購物請先登入會員喔！
                  </RemindToLoginSpan>

                  <RemindToLoginBtn
                    disabled={location.pathname === "/auth"}
                    onClick={() => navigate("/auth")}
                  >
                    前去登入
                  </RemindToLoginBtn>
                </>
              )}
            </DefaultBox>

            {userInfo &&
              items.map((item) => (
                <ItemsContainer key={item._id}>
                  <div className="thumbNailWrapper">
                    <img
                      src={item.productId.images[0].url}
                      alt={item.productId.images[0].alt}
                    />
                  </div>
                  <div className="influxInfo">
                    {/* 調整 */}
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
                <span>$ {totalPrice}</span>
              </div>

              <CheckBtn
                disabled={items.length === 0}
                onClick={() => navigate("/checkout")}
              >
                結帳
              </CheckBtn>
            </div>
          </CartBottom>
        </CartContainer>
      </Drawer>
    </>,
    document.body
  );
}
export default CartDrawer;
