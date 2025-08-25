import { MdEdit } from "react-icons/md";
import styled from "styled-components";

export const CheckoutContainer = styled.div`
  display: flex;
  gap: 2rem;
  margin: 0 auto;
  //align-items: flex-start; /* 避免 flex 拉伸 */
`;

export const LeftContainer = styled.div`
  //background-color: red;

  flex: 2;
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
export const DeliverCard = styled.div`
  margin: 1rem;
`;
export const Top = styled.div`
  display: flex;
  justify-content: space-between;
`;
export const Bottom = styled.div``;
export const DeliverTitle = styled.span``;
export const EditAddress = styled(MdEdit)`
  cursor: pointer;
`;
