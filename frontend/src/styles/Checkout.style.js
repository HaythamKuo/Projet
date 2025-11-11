import { MdEdit, MdOutlineCreditScore } from "react-icons/md";
import { FaLine } from "react-icons/fa";
import styled from "styled-components";
import { imgBasicStyle } from "./theme";
import {
  ItemsContainer,
  IconBtn,
  DeleteCart,
  CartToSave,
} from "./CartDrawer.style";
import { SubmitBtn, CancelBtn } from "./ProdImgGallery.style";

export const CheckoutContainer = styled.form`
  display: flex;
  gap: 2rem;
  margin: 0 auto;
  //align-items: flex-start; /* 避免 flex 拉伸 */
`;

export const LeftContainer = styled.div`
  flex: 2;

  display: flex;
  flex-direction: column;

  gap: 2rem;
`;

//block
export const PickupBlock = styled.div`
  border-radius: 8px;
  border: 1px solid black;
  background-color: ${({ theme }) => theme.card.specificBack};
`;
export const PaddingCard = styled.div`
  margin: 1rem;

  span {
    color: ${({ theme }) => theme.colors.default};
  }
`;

// styled-component
export const PaymentMethod = styled.button.attrs({ type: "button" })`
  display: flex;
  align-items: center;
  //background-color: red;
  padding: 1rem;
  margin: 1rem 0;
  border-radius: 0.25rem;
  gap: 1rem;
  border: 2px solid
    ${({ $isselected }) => ($isselected ? "black" : "transparent")};
  cursor: pointer;
  width: 100%; /* 讓它像選項一樣佔滿可點擊區域 */
  background-color: ${({ theme }) => theme.button.ckBackGround};

  p {
    color: ${({ theme }) => theme.colors.default};
  }

  &:disabled {
    opacity: 0.5;
    cursor: not-allowed;
  }
`;

export const CreditIcon = styled(MdOutlineCreditScore)`
  font-size: 1.5rem;
  color: ${({ theme }) => theme.colors.default};
`;
export const LineIcon = styled(FaLine)`
  font-size: ${(props) => props.size || "1.5rem"};
  color: ${({ theme }) => theme.colors.default};
`;

export const Top = styled.div`
  display: flex;
  justify-content: space-between;
  span {
    color: ${({ theme }) => theme.colors.default};
  }
`;
export const ConfirmAddress = styled.p`
  color: ${({ theme }) => theme.colors.default};
  font-weight: bold;
  font-size: 1.25rem;
`;

export const EditAddress = styled(MdEdit)`
  cursor: pointer;
  color: ${({ theme }) => theme.colors.default};
`;

export const PaymentBlock = styled(PickupBlock)``;
export const PayQuote = styled.blockquote`
  padding: 1rem;
  margin: 1rem 0;

  color: ${({ theme }) => theme.colors.typeWriter};
  font-size: 1rem;
  line-height: 1.6;

  background-color: ${({ theme }) => theme.colors.backGround};
  border-radius: 0.25rem;
`;

export const ItemBlock = styled(PickupBlock)``;

export const ItemTop = styled(Top)`
  align-items: center;
`;

export const ImgWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 1rem;

  width: 100px;
  height: 100px;

  overflow: hidden;

  aspect-ratio: 1/1;

  p {
    color: ${({ theme }) => theme.colors.default};
  }

  img {
    ${imgBasicStyle}/* height:auto; */
  }
`;
export const ItemBottom = styled.div`
  display: flex;
  gap: 1rem;
  flex-direction: ${(prop) =>
    prop.$direction === "flexibility" ? "column" : "row"};
`;

//以下似乎可以重構
export const CkItemBox = styled(ItemsContainer)`
  display: flex;
`;

export const RightContainer = styled.div`
  flex: 1;
  background-color: ${({ theme }) => theme.card.specificBack};

  position: sticky;
  top: var(--nav-height);
  align-self: flex-start;
  height: fit-content;

  display: flex;
  flex-direction: column;
  border-radius: 0.25rem;
  border-radius: 1rem;
  border: 2px solid ${({ theme }) => theme.spotLight.border};
`;

export const RightTop = styled.div`
  border-bottom: 1px solid ${({ theme }) => theme.colors.default};
  display: flex;
  flex-direction: column;
  gap: 10px;
  padding: 1rem;
`;
export const OrderTitle = styled.h1`
  font-size: 2rem;
  font-weight: bold;
  color: ${({ theme }) => theme.colors.default};
`;
export const OrderAmount = styled.div`
  display: flex;
  justify-content: space-between;
  font-size: 20px;
  color: ${({ theme }) => theme.colors.default};
`;
export const RightCenter = styled.div`
  display: flex;
  flex-direction: column;
  border-bottom: 1px solid ${({ theme }) => theme.colors.default};

  gap: 0.5rem;

  padding: 1rem;
`;
export const SubtotalItems = styled(OrderAmount)`
  font-size: 15px;
`;
export const RightBottom = styled.div`
  display: flex;
  flex-direction: column;

  padding: 1rem;
  gap: 1rem;
`;
export const Total = styled(OrderAmount)`
  font-size: 25px;
`;
export const SubMit = styled(SubmitBtn)`
  //color: green;
  background-color: #458500;
  font-weight: bolder;
`;
