import styled from "styled-components";
import { flexCenter } from "./theme";

export const CenterOfHome = styled.div`
  ${flexCenter}
  flex-direction:column;
  background-color: green;
  height: 40vh;
  //  width: 100%;
`;

export const AttributesContainer = styled.div`
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: space-around;
`;
