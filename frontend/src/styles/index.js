import styled from "styled-components";
import { LayoutContainer } from "./layout.style";

export const LayoutWrapper = styled.div`
  min-height: 100vh;
  display: flex;
  flex-direction: column;
`;

export const ContentContainer = styled(LayoutContainer)`
  flex: 1; // 讓它能撐滿 LayoutWrapper 的剩餘空間
  display: flex;
  flex-direction: column;
  //為何原先要用padding?
  //margin-top: 6rem;
  padding-top: 6rem;
`;
export const MainContent = styled.div`
  flex: 1;
`;
