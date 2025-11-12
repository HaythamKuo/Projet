import { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { useDispatch, useSelector, shallowEqual } from "react-redux";
import {
  CheckoutContainer,
  RightContainer,
  LeftContainer,
  PickupBlock,
  PaddingCard,
  Top,
  EditAddress,
  PaymentBlock,
  PayQuote,
  ItemBlock,
  ItemTop,
  ImgWrapper,
  ItemBottom,
  CkItemBox,
  PaymentMethod,
  CreditIcon,
  LineIcon,
  RightTop,
  RightCenter,
  RightBottom,
  OrderTitle,
  OrderAmount,
  SubtotalItems,
  Total,
  SubMit,
  ConfirmAddress,
} from "../styles/Checkout.style";
import { SubmitBtn, CancelBtn } from "../styles/ProdImgGallery.style";
import Modal from "./Modal";
import FormField from "./FormField";
import { useChangeAddressMutation } from "../store/apis/apiSlice";
import {
  useCreateOrderMutation,
  useCreateEcPaymentMutation,
} from "../store/apis/orderAPi";

import { updateAddress } from "../store/slices/authSlice";
import { selectCartItems } from "../store/slices/cartSlice";

import ProcessLoader from "../styles/UI/ProcessLoader";
import { Arrow } from "./SelectOption";
import { validateOrder } from "../utils/validation";

import RafactorUnpaidCard from "../styles/UI/RefactorUnpaidCard";

function Checkout() {
  const dialogRef = useRef();
  const navigate = useNavigate();
  // const location = useLocation();
  const dispatch = useDispatch();

  const [method, setMethod] = useState("credit_card");

  const [isOpen, setIsOpen] = useState(false);
  const [isExtexnd, setIsExtend] = useState(false);
  const [processOfPaying, setProcessOfPaying] = useState(false);

  const [innards, setInnards] = useState("simple");

  const { userInfo } = useSelector((state) => state.auth);
  const items = useSelector(selectCartItems);
  const {
    cart,
    isLoading: fetching,
    error: errMes,
  } = useSelector((state) => state.cart, shallowEqual);

  const [address, setAddress] = useState(userInfo?.address || "");

  const [saveAddress, { isLoading }] = useChangeAddressMutation();

  //訂單api via rtk query
  const [createOrder, { isLoading: updatting }] = useCreateOrderMutation();

  const [createEcPayment, { isLoading: forwarding }] =
    useCreateEcPaymentMutation();

  // useEffect(() => {
  //   if (!items || items.length === 0) {
  //     dispatch(fetchGoods());
  //   }
  // }, [dispatch]);

  useEffect(() => {
    if (fetching) return;

    if (!errMes && !items && items.length === 0) {
      toast.error("購物車內沒有商品");
      navigate("/products", { replace: true });
      return;
    }

    if (errMes) {
      toast.error("無法讀取購物車內的商品");
    }
  }, [userInfo, items, navigate, fetching, errMes]);

  //  console.log(items[0]?.productId?.images[0]?.url);

  function showModal() {
    if (dialogRef.current && !dialogRef.current.open) {
      setIsOpen(true);
    }
  }

  //處理地址
  async function hanldeAddress() {
    try {
      const { message, newAddress } = await saveAddress({ address }).unwrap();
      dispatch(updateAddress(newAddress));
      setIsOpen(false);
      toast.success(message);
    } catch (error) {
      console.log(error?.data?.message || "儲存失敗");
      toast.error(error?.data?.message || "儲存失敗");
    }
  }

  //拓展商品細項
  function extendPanel() {
    setIsExtend((pre) => !pre);

    setInnards((prev) => {
      if (prev === "simple") return "flexibility";
      if (prev === "flexibility") return "simple";
      return "simple";
    });
  }

  //測試金流轉傳
  function redirectToEcpay(paymentUrl, params) {
    const form = document.createElement("form");
    form.method = "POST";
    form.action = paymentUrl;
    form.style.display = "none"; // 隱藏表單

    Object.entries(params).forEach(([key, value]) => {
      const input = document.createElement("input");
      input.type = "hidden";
      input.name = key;
      input.value = value;
      form.appendChild(input);
    });
    document.body.appendChild(form);
    form.submit();
    document.body.removeChild(form);
  }

  //製作訂單
  async function setOrder(e) {
    e.preventDefault();

    if (!userInfo) {
      toast.error("請先登入再結帳");
      return;
    }

    if (!items || items.length === 0) {
      toast.error("購物車內沒有商品");
      return;
    }

    if (processOfPaying || updatting || forwarding) return;

    const { isValid, errs, cleanValue } = validateOrder(address, items, method);

    if (!isValid) {
      errs.forEach((e) => toast.error(e));
      return;
    }

    setProcessOfPaying(true);

    const payload = {};

    Object.assign(payload, {
      address,
      totalAmount: items?.length,
      items: cleanValue.items.map((item) => ({
        product: item.productId._id,
        prodName: item.productId.name,
        quantity: item.quantity,
        price: item.unitPrice,
      })),
      totalPrice: cleanValue.totalPrice,
      paymentMethod: cleanValue.paymentMethod,
    });
    console.log("cart.totalPrice", cart.totalPrice);
    console.log("payload", payload);

    try {
      toast.info("正在製作訂單", { autoClose: 1500 });
      const res = await createOrder(payload).unwrap();

      // ========== 如果是 reused 訂單 ==========
      if (res.reused) {
        const { _id: orderId, totalPrice, orderItems, status } = res.order;

        if (status === "pending") {
          toast.info("已有未付款的訂單，將導向付款頁面");

          const paymentResult = await createEcPayment({
            orderId,
            totalAmount: totalPrice,
            itemName: orderItems.map((item) => item.name).join("#"),
            customerEmail: userInfo.email,
          }).unwrap();

          if (paymentResult.success) {
            return setTimeout(() => {
              redirectToEcpay(paymentResult.paymentUrl, paymentResult.params);
            }, 1500);
          } else {
            toast.error("付款建立失敗，請稍後再試");
            return;
          }
        }

        if (status === "paid") {
          toast.info("此訂單已完成付款，將導向訂單明細");
          return navigate(`/orders/${orderId}`);
        }

        if (status === "canceled" || status === "failed") {
          toast.error("先前訂單已失效，將重新建立新訂單");
          // 不 return，繼續往下建立新訂單
        }
      }

      // ========== 如果是新訂單 ==========
      const { _id: orderId, totalPrice, orderItems } = res.order;

      const paymentResult = await createEcPayment({
        orderId,
        totalAmount: totalPrice,
        itemName: orderItems.map((item) => item.name).join("#"),
        customerEmail: userInfo.email,
      }).unwrap();

      console.log(paymentResult);

      if (paymentResult.success) {
        toast.success("訂單建立成功，即將導向付款介面", { autoClose: 1000 });
        return setTimeout(() => {
          redirectToEcpay(paymentResult.paymentUrl, paymentResult.params);
        }, 1000);
      } else {
        throw new Error("建立付款失敗");
      }
    } catch (error) {
      console.log(error);
      if (error?.data?.step === "payment") {
        toast.error("付款設置失敗，請稍後再試或聯繫客服");
      }
    } finally {
      setProcessOfPaying(false);
    }
  }

  return (
    <>
      {(isLoading || processOfPaying) && <ProcessLoader />}

      <CheckoutContainer onSubmit={setOrder}>
        <Modal
          ref={dialogRef}
          isOpen={isOpen}
          onClose={() => setIsOpen(false)}
          height="500px"
          width="600px"
        >
          <FormField
            label="請編輯你的取貨地址"
            onChange={(e) => setAddress(e.target.value)}
            value={address}
            $isCenter
          />

          {/* 暫定樣式 */}

          <div
            style={{
              display: "flex",
              gap: "5rem",
            }}
          >
            <SubmitBtn
              disabled={isLoading}
              onClick={() => hanldeAddress(address)}
            >
              儲存
            </SubmitBtn>

            <CancelBtn onClick={() => setIsOpen(false)}>取消</CancelBtn>
          </div>
        </Modal>

        <LeftContainer>
          <PickupBlock>
            <PaddingCard>
              <Top>
                <span>取貨地點</span>

                <EditAddress onClick={() => showModal()} />
              </Top>

              <ConfirmAddress>
                {userInfo?.address || "請輸入你的取貨地址"}
              </ConfirmAddress>
            </PaddingCard>
          </PickupBlock>

          <PaymentBlock>
            <PaddingCard>
              <span>付款方式</span>
              <PayQuote>💡 目前僅支援信用卡付款 請見諒</PayQuote>
              <PaymentMethod
                $isselected={method === "credit_card"}
                onClick={() => setMethod("credit_card")}
              >
                <CreditIcon />
                <p>信用卡付款</p>
              </PaymentMethod>
              <PaymentMethod
                disabled
                $isselected={method === "linePay"}
                onClick={() => setMethod("linePay")}
              >
                <LineIcon />
                <p>LINE PAY 付款(即將開放)</p>
              </PaymentMethod>
            </PaddingCard>
          </PaymentBlock>

          <ItemBlock>
            {items.length === 0 ? (
              "哈哈是我啦"
            ) : (
              <PaddingCard>
                <ItemTop>
                  <span>{items?.length}件商品 </span>
                  <Arrow $rottate={isExtexnd} onClick={() => extendPanel()} />
                </ItemTop>
                <ItemBottom $direction={innards}>
                  {innards === "simple" &&
                    items?.length > 0 &&
                    items.map((item) => (
                      <ImgWrapper key={item._id}>
                        <img
                          src={item.productId.images[0].url}
                          alt={item.productId.images[0].alt}
                        />
                        <p>X {item.quantity}</p>
                      </ImgWrapper>
                    ))}
                  {innards === "flexibility" &&
                    items?.length > 0 &&
                    items.map((item) => (
                      <CkItemBox key={item._id}>
                        <RafactorUnpaidCard
                          src={item?.productId?.images[0].url}
                          alt={item?.productId?.images[0].alt}
                          prodName={item?.productId?.name}
                          unitPrice={item?.unitPrice}
                          item={item}
                          $aspect
                        />
                      </CkItemBox>
                    ))}
                </ItemBottom>
              </PaddingCard>
            )}
          </ItemBlock>
        </LeftContainer>

        <RightContainer>
          <RightTop>
            <OrderTitle>訂單匯總</OrderTitle>
            <OrderAmount>
              <span>訂單價值</span>
              <span>$ {cart.totalPrice}</span>
            </OrderAmount>
          </RightTop>
          <RightCenter>
            <SubtotalItems>
              <p>小計</p>
              <p>{cart.totalPrice}</p>
            </SubtotalItems>
            <SubtotalItems>
              <p>運費</p>
              <p>完全免費!</p>
            </SubtotalItems>
          </RightCenter>
          <RightBottom>
            <Total>
              <p>總額</p>
              <p>$ {cart.totalPrice}</p>
            </Total>
            <SubMit>{updatting ? "生成中" : "前往結帳"}</SubMit>
          </RightBottom>
        </RightContainer>
      </CheckoutContainer>
    </>
  );
}
export default Checkout;
