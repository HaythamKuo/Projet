import { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";

import { toast } from "react-toastify";
import { useDispatch, useSelector } from "react-redux";
import {
  CheckoutContainer,
  RightContainer,
  LeftContainer,
  PickupBlock,
  PaddingCard,
  Top,
  DeliverTitle,
  EditAddress,
  PaymentBlock,
  PayQuote,
  ItemBlock,
  ItemTop,
  ImgWrapper,
  ItemBottom,
  CkItemBox,
  CkBtn,
  CkSave,
  CkDelete,
} from "../styles/Checkout.style";
import { SubmitBtn, CancelBtn } from "../styles/ProdImgGallery.style";
import Modal from "./Modal";
import FormField from "./FormField";
import { useChangeAddressMutation } from "../store/apis/apiSlice";
import {
  useCreateOrderMutation,
  useCreateEcPaymentMutation,
} from "../store/apis/orderAPi";
import { fetchGoods } from "../store/thunks/fetchGoods";
import { updateAddress } from "../store/slices/authSlice";
import ProcessLoader from "../styles/UI/ProcessLoader";
import { Arrow } from "./SelectOption";
import { validateOrder } from "../utils/validation";
function Checkout() {
  const dialogRef = useRef();
  const navigate = useNavigate();

  const [isOpen, setIsOpen] = useState(false);
  const [isExtexnd, setIsExtend] = useState(false);
  const [processOfPaying, setProcessOfPaying] = useState(false);

  const [innards, setInnards] = useState("simple");

  const dispatch = useDispatch();
  const { userInfo } = useSelector((state) => state.auth);
  const [address, setAddress] = useState(userInfo?.address || "");

  const [saveAddress, { isLoading }] = useChangeAddressMutation();

  //訂單api via rtk query
  const [createOrder, { isLoading: updatting }] = useCreateOrderMutation();

  const [createEcPayment, { isLoading: forwarding }] =
    useCreateEcPaymentMutation();

  //購物車產品
  const { items } = useSelector((state) => state.cart.cart);

  useEffect(() => {
    if (!userInfo) {
      toast.error("請先登入再結帳");
      navigate("/auth", { replace: true });
      return;
    }

    if (!items || items.length === 0) {
      toast.error("購物車內沒有商品");
      navigate("/products", { replace: true });
      return;
    }
  }, [userInfo, items, navigate]);

  useEffect(() => {
    dispatch(fetchGoods());
  }, [dispatch]);

  //  console.log(items[0]?.productId?.images[0]?.url);

  function showModal() {
    if (dialogRef.current && !dialogRef.current.open) {
      setIsOpen(true);
    }
  }

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

  let paymentMethod = "credit_card";

  //console.log(items);
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

    const { isValid, errs, cleanValue } = validateOrder(
      address,
      items,
      paymentMethod
    );

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

    try {
      toast.info("正在製作訂單", { autoClose: 1500 });
      const res = await createOrder(payload).unwrap();
      //console.log(res);
      //toast.success(res?.message)
      console.log("訂單建立成功");

      const { _id: orderId, totalPrice, orderItems } = res.newOrder;

      //console.log(orderId);

      const paymentResult = await createEcPayment({
        orderId,
        totalAmount: totalPrice,
        itemName: orderItems.map((item) => item.name).join("#"),
        customerEmail: "qaz7954200@livemail.tw",
      }).unwrap();

      if (paymentResult.success) {
        toast.success("訂單建立成功 即將導向付款介面", {
          autoClose: 1000,
        });
        setTimeout(() => {
          redirectToEcpay(paymentResult.paymentUrl, paymentResult.params);
        }, 1000);
      } else {
        throw new Error("建立付款失敗");
      }
    } catch (error) {
      console.log(error);

      // 如果是付款階段失敗，給用戶明確的指示
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

              <p>{userInfo?.address || "請輸入你的取貨地址"}</p>
            </PaddingCard>
          </PickupBlock>

          <PaymentBlock>
            <PaddingCard>
              <span>付款方式</span>
              <PayQuote>💡 目前僅支援信用卡付款 請見諒</PayQuote>
            </PaddingCard>
          </PaymentBlock>

          <ItemBlock>
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
                          <CkBtn>
                            <CkDelete />
                          </CkBtn>

                          <CkBtn>
                            <CkSave />
                          </CkBtn>
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
                    </CkItemBox>
                  ))}
              </ItemBottom>
            </PaddingCard>
          </ItemBlock>
        </LeftContainer>

        <RightContainer>
          right Lorem ipsum dolor sit amet consectetur adipisicing elit. Quo
          tempore aliquam velit saepe, necessitatibus excepturi corporis
          blanditiis reiciendis, libero, ipsa labore nostrum quasi doloribus
          accusantium nulla! Totam maiores perferendis nihil quas? Explicabo
          omnis vitae similique est cumque quis voluptate recusandae iure
          tempora lor
        </RightContainer>

        <button>{updatting ? "生成中" : "哈哈是我啦"}</button>
      </CheckoutContainer>
    </>
  );
}
export default Checkout;
