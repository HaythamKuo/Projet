import styled from "styled-components";
import { flexCenter } from "./theme";
import { SubmitBtn, CancelBtn } from "./ProdImgGallery.style";

export const OrderContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
`;

export const OrderBlock = styled.div`
  background-color: white;
  border: 1px solid black;
  padding: 2rem;
  border-radius: 0.25rem;

  display: flex;
  justify-content: space-between;
  gap: 1rem;
  overflow: hidden;
`;

export const Left = styled.div`
  display: flex;
  flex-direction: column;
`;

export const OrderTop = styled.div``;
export const OrderStatus = styled.span`
  font-weight: bold;
  font-size: 1.5rem;
  color: #348aa7;
`;
export const OrderDate = styled.p``;

export const OrderItems = styled.div`
  display: flex;
  gap: 1.5rem;
`;
export const ImgWrapper = styled.div``;
export const TestImg = styled.img``;
export const OrderRight = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;
`;

export const Prodname = styled.p`
  font-size: 1.5rem;
`;
export const Quantity = styled.p`
  font-size: 1.25rem;
`;

// export const RankBox = styled``;
export const RankBtn = styled.button.attrs({ type: "button" })`
  border: none;
`;

export const Right = styled.div``;
export const OrderId = styled.p`
  color: gray;
`;
export const OrderTotal = styled.p`
  font-size: 1.25rem;
`;

export const ModalBox = styled.form`
  display: flex;
  flex-direction: column;
  justify-content: space-around;

  width: 100%;
  height: 100%;
`;
export const ReviewArea = styled.textarea`
  width: 100%;
  min-height: 80px;
  max-height: 200px; /* 超過出現捲動條 */
  padding: 0.5rem;
  border: 1px solid #ccc;
  border-radius: 6px;
  resize: vertical; /* 允許垂直調整大小 */
  font-size: 1rem;
  line-height: 1.5;

  transition: border-color 0.2s;

  &:hover {
    border-color: #888;
  }

  &:focus {
    border-color: #005fcc;
    outline: none;
    box-shadow: 0 0 0 2px rgba(0, 95, 204, 0.2);
  }
`;

export const InnerBox = styled.div`
  ${flexCenter}
  flex-direction: column;
  overflow-y: auto;
`;

export const CommentConfirm = styled(SubmitBtn)``;
export const CommentCancel = styled(CancelBtn).attrs({ type: "button" })``;
