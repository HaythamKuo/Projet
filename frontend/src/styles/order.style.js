import styled from "styled-components";
import { flexCenter } from "./theme";
import { SubmitBtn, CancelBtn } from "./ProdImgGallery.style";

export const OrderContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
`;

export const OrderBlock = styled.div`
  background-color: ${({ theme }) => theme.card.specificBack};
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
export const OrderDate = styled.p`
  color: ${({ theme }) => theme.colors.default};
`;

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
  color: ${({ theme }) => theme.colors.default};
`;
export const Quantity = styled.p`
  font-size: 1.25rem;
  color: ${({ theme }) => theme.colors.default};
`;

// export const RankBox = styled``;
export const RankBtn = styled.button.attrs({ type: "button" })`
  border: none;
`;

export const Right = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1rem;
`;
export const OrderId = styled.p`
  color: ${({ theme }) => theme.button.direct};
`;
export const OrderTotal = styled.p`
  font-size: 1.25rem;
  color: ${({ theme }) => theme.colors.default};
`;

export const ModalBox = styled.form`
  flex-direction: column;
  ${flexCenter}
  gap: 1rem;

  width: 100%;
  height: 100%;
  padding: 1rem;
`;
export const ModalProdName = styled.p`
  font-size: 2rem;
  color: ${({ theme }) => theme.colors.default};
`;
export const ReviewArea = styled.textarea`
  width: 30%;

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

export const CommentConfirm = styled(SubmitBtn)``;
export const CommentCancel = styled(CancelBtn).attrs({ type: "button" })``;

export const ShowNewBtn = styled(SubmitBtn)`
  width: 200px;
`;
export const ErrRes = styled.p`
  color: red;
`;
export const BtnBox = styled.div`
  display: flex;
  justify-content: center;
  gap: 1rem;
  margin-top: 2rem;
`;

export const ConfineBox = styled.div`
  ${flexCenter};
  justify-content: flex-start;
  width: 100%;
  max-height: 400px;
  height: auto;
  overflow-y: auto;
  flex-direction: column;
  gap: 1rem;
  padding: 1rem;

  background-color: ${({ theme }) => theme.card.specificBack};
  border: 1px solid #ddd;
  border-radius: 20px;
`;
