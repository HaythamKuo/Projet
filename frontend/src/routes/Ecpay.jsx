import { useEffect } from "react";
import ErrPage from "./ErrPage";
import styled from "styled-components";
import { Link, useSearchParams } from "react-router-dom";
import { useDispatch } from "react-redux";
import ShinyText from "../components/reactBit/ShinyText";
import { flexCenter, imgBasicStyle } from "../styles/theme";
import { SubmitBtn, CancelBtn } from "../styles/ProdImgGallery.style";
import { useGetSingleOrderQuery } from "../store/apis/orderAPi";
import ProcessLoader from "../styles/UI/ProcessLoader";
import { clearCart } from "../store/slices/cartSlice";
import { emptiedCart } from "../store/thunks/addGoods";

const Container = styled.div`
  flex-direction: column;

  ${flexCenter}
`;

const ImgWrapper = styled.div`
  width: 40%;
  height: 30%;
`;
const PayResSuccess = styled.img`
  ${imgBasicStyle}
`;

const OptionBlock = styled(Container)`
  border-radius: 12px;

  background-color: aliceblue;
  width: 100%;
  max-width: 400px;
  gap: 1rem;
  padding: 16px;
  box-shadow: ${({ theme }) => theme.colors.boxShadow};
`;

const OptionSpan = styled.span`
  font-size: 1.5rem;
`;
const OptionBtn = styled.div`
  display: flex;
  gap: 2rem;
`;

function Ecpay() {
  //http://localhost:5173/ecpayresult?status=success&orderId=68bd26099ae381247f4a2e19
  const dispatch = useDispatch();

  //獲取最新訂單狀態
  const [searchParam] = useSearchParams();

  const status = searchParam.get("status");
  const orderId = searchParam.get("orderId");
  const { data: order, isLoading } = useGetSingleOrderQuery(orderId);

  //const order = query?.data;
  const apiOrderId = order?._id ?? null;
  const apiOrderStatus = order?.status ?? null;

  const isSuccess = status === "success" && apiOrderStatus === "paid";
  const isFailed = status === "failed" && apiOrderStatus === "failed";

  useEffect(() => {
    if (isSuccess) {
      dispatch(clearCart());
      console.log("作動");

      dispatch(emptiedCart())
        .unwrap()
        .catch((e) => console.error("清空後端購物車失敗:", e));
    }
  }, [dispatch, isSuccess]);

  //console.log(data);
  if (isLoading) {
    return <ProcessLoader />;
  }

  //訂單資料本身

  if (!apiOrderId || apiOrderId !== orderId) {
    return <ErrPage />;
  }

  if (!isSuccess && !isFailed) {
    return <ErrPage />;
  }

  // console.log("apiOrderId" + apiOrderId);
  // console.log("apiOrderStatus" + apiOrderStatus);

  return (
    <>
      <Container>
        <ImgWrapper>
          <PayResSuccess
            src={isSuccess ? "/forSuccss.png" : "/forFailed.png"}
            alt="發生一些錯誤"
          />
        </ImgWrapper>
        <OptionBlock>
          <ShinyText text={isSuccess ? "付款成功" : "付款失敗"} />
          {isFailed && (
            <p style={{ color: "red", fontWeight: "bold" }}>
              看來發生一些錯誤 請重新交易或是靜待開發者處理
            </p>
          )}
          <OptionSpan>接下來可以選擇</OptionSpan>
          <OptionBtn>
            {isSuccess ? (
              <>
                <SubmitBtn as={Link} to="/profile/orders">
                  瀏覽訂單
                </SubmitBtn>
                <CancelBtn as={Link} to="/">
                  回首頁
                </CancelBtn>
              </>
            ) : (
              <>
                <SubmitBtn as={Link} to="/checkout">
                  重新付款
                </SubmitBtn>
                <CancelBtn as={Link} to="/">
                  回首頁
                </CancelBtn>
              </>
            )}
          </OptionBtn>
        </OptionBlock>
      </Container>
    </>
  );
}
export default Ecpay;
