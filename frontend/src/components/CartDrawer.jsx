import { useEffect, useRef } from "react";
import { createPortal } from "react-dom";
import { useLocation, useNavigate } from "react-router-dom";

import { toast } from "react-toastify";

import ProcessLoader from "../styles/UI/ProcessLoader";
import useClickOutside from "../hooks/useClickOutside";
import { useSelector, useDispatch } from "react-redux";
import { useScrollBlock } from "../hooks/useScrollBlock";

import { fetchGoods } from "../store/thunks/fetchGoods";

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
import RafactorUnpaidCard from "../styles/UI/RefactorUnpaidCard";

import {
  closeCart,
  selectCartItems,
  cartTotalPrice,
} from "../store/slices/cartSlice";

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
              items.map((item) => {
                return (
                  <ItemsContainer key={item._id}>
                    <RafactorUnpaidCard
                      src={item?.productId?.images[0].url}
                      alt={item?.productId?.images[0].alt}
                      prodName={item?.productId?.name}
                      unitPrice={item?.unitPrice}
                      item={item}
                    />
                  </ItemsContainer>
                );
              })}
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
