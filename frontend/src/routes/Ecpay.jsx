import styled from "styled-components";
import { useSearchParams } from "react-router-dom";
import ShinyText from "../components/reactBit/ShinyText";
import { imgBasicStyle } from "../styles/theme";
import { SubmitBtn, CancelBtn } from "../styles/ProdImgGallery.style";

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  //background-color: red;
`;

const ImgWrapper = styled.div`
  //background-color: red;
  width: 40%;
  height: 30%;

  //overflow: hidden;
`;
const PayResSuccess = styled.img`
  ${imgBasicStyle}
`;

const OptionBlock = styled.div`
  //margin-top: 1rem;

  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  //border: 1px solid black;
  border-radius: 12px;

  background-color: aliceblue;
  width: 100%;
  max-width: 400px;
  gap: 1rem;
  padding: 16px;
  box-shadow: ${({ theme }) => theme.colors.boxShadow};
`;

const OptionSpan = styled.span`
  font-size: 2rem;
`;
const OptionBtn = styled.div`
  display: flex;
  gap: 2rem;
`;

function Ecpay() {
  //http://localhost:5173/ectest?status=success&orderId=68b96315eada72e8453fe2d2

  const [searchParam] = useSearchParams();

  //const status = searchParam.get("status");
  //const orderId = searchParam.get("orderId");

  //console.log(orderId);

  return (
    <Container>
      <ImgWrapper>
        <PayResSuccess src="/forSuccss.png" alt="發生一些錯誤" />
      </ImgWrapper>
      <OptionBlock>
        <ShinyText text="付款成功!" disabled={false} />
        <OptionSpan>接下來可以選擇</OptionSpan>
        <OptionBtn>
          <SubmitBtn>瀏覽訂單</SubmitBtn>
          <CancelBtn>回首頁</CancelBtn>
        </OptionBtn>
      </OptionBlock>
    </Container>
  );
}
export default Ecpay;
