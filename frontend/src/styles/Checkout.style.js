import { MdEdit } from "react-icons/md";
import styled from "styled-components";
import { imgBasicStyle } from "./theme";
import {
  ItemsContainer,
  IconBtn,
  DeleteCart,
  CartToSave,
} from "./CartDrawer.style";

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
export const RightContainer = styled.div`
  flex: 1;
  background-color: green;
  position: sticky;
  top: var(--nav-height);
  align-self: flex-start;
  height: fit-content;
`;

//block
export const PickupBlock = styled.div`
  background-color: yellow;
  border-radius: 8px;
  border: 1px solid black;
`;
export const PaddingCard = styled.div`
  margin: 1rem;
`;
export const Top = styled.div`
  display: flex;
  justify-content: space-between;
`;

export const DeliverTitle = styled.span``;
export const EditAddress = styled(MdEdit)`
  cursor: pointer;
`;

export const PaymentBlock = styled(PickupBlock)``;
export const PayQuote = styled.blockquote`
  //padding-left: 1rem; /* 與文字的間距 */
  padding: 1rem;
  margin: 1rem 0;

  color: ${({ theme }) => theme.colors.typeWriter};
  font-size: 1rem;
  line-height: 1.6;

  background-color: #ededed;
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

  img {
    ${imgBasicStyle}
    height:auto;
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
export const CkBtn = styled(IconBtn)`
  background: transparent;
`;
export const CkDelete = styled(DeleteCart)``;
export const CkSave = styled(CartToSave)``;
