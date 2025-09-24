import styled from "styled-components";

export const OrderContainer = styled.div``;

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
export const OrderStatus = styled.span``;
export const OrderDate = styled.p``;

export const OrderItems = styled.div`
  display: flex;
  gap: 1.25rem;
`;
export const ImgWrapper = styled.div``;
export const TestImg = styled.img``;
export const OrderRight = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;
`;

export const Prodname = styled.p``;
export const Quantity = styled.p``;

// export const RankBox = styled``;
export const RankBtn = styled.button.attrs({ type: "button" })`
  border: none;
`;

export const Right = styled.div``;
export const OrderId = styled.p``;
export const OrderTotal = styled.p``;
