import { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
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
import { fetchGoods } from "../store/thunks/fetchGoods";
import { updateAddress } from "../store/slices/authSlice";
import ProcessLoader from "../styles/UI/ProcessLoader";
import { Arrow } from "./SelectOption";
function Checkout() {
  const dialogRef = useRef();

  const [isOpen, setIsOpen] = useState(false);
  const [isExtexnd, setIsExtend] = useState(false);

  const [innards, setInnards] = useState("simple");

  // const [content, setContent] = useState(null);

  const dispatch = useDispatch();
  const { userInfo } = useSelector((state) => state.auth);
  const [address, setAddress] = useState(userInfo?.address || "");

  const [saveAddress, { isLoading }] = useChangeAddressMutation();

  //購物車產品
  const { items } = useSelector((state) => state.cart.cart);

  useEffect(() => {
    dispatch(fetchGoods());
  }, [dispatch]);

  // useEffect(() => {
  //   if (items?.length > 0 && innards === "simple") {
  //     setContent(
  //       items.map((item) => (
  //         <ImgWrapper key={item._id}>
  //           <img
  //             src={item.productId.images[0].url}
  //             alt={item.productId.images[0].alt}
  //           />
  //           <p>X {item.quantity}</p>
  //         </ImgWrapper>
  //       ))
  //     );
  //   }else if(items?.length > 0 && innards === "flexibility"){
  //     setContent('商品詳細資訊')
  //   }
  // }, [items, innards]);

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

  function setOrder(e) {
    e.preventDefault();
    const data = new FormData();

    data.append("address", address);
    data.append("長度", items?.length);

    console.log(data);
  }

  return (
    <>
      {isLoading && <ProcessLoader />}

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
        {/* <Link to="https://payment-stage.ecpay.com.tw/Cashier/AioCheckOut/V5">
          test
        </Link> */}
        <button>哈哈是我啦</button>
      </CheckoutContainer>
    </>
  );
}
export default Checkout;
