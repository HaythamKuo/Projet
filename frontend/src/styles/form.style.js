import styled from "styled-components";
import { Link } from "react-router-dom";
import { flexCenter } from "./theme";
import { GoogleIcon } from "../components/BindAcc";

export const Container = styled.div`
  /* display: flex;
  align-items: center;
  justify-content: center; */
  ${flexCenter}
  flex-direction: column;

  gap: 2rem;
  padding: 2rem;
  border-radius: 1.5rem;
  //box-shadow: 0px 0px 10px 0px rgba(0, 0, 0, 0.1);
  box-shadow: ${({ theme }) => theme.colors.specificShadow};

  h1 {
    font-weight: 800;
    font-size: 2rem;
    color: ${({ theme }) => theme.colors.default};
  }
`;

export const FormContainer = styled.form`
  width: 100%;
  display: flex;
  flex-direction: column;
  gap: 1rem;

  button {
    padding: 0.75rem;
    border: none;
    border-radius: 1rem;
    background: #007bff;
    background: ${({ theme }) => theme.button.backGround};
    color: white;
    font-size: 1rem;
    cursor: pointer;
    width: 50%;
    align-self: center;
    &:hover {
      background: #38bdf8;
    }
  }
`;

export const FormGroup = styled.div`
  display: flex;
  flex-direction: column;
  gap: 8px;
  padding: 10px;

  align-items: ${(props) => (props.$isCenter ? "center" : "")};

  ${(props) =>
    props.$firstPadding &&
    `&:first-child {
      padding: 10px 10px 10px 0;
    }`}

  label {
    font-size: 1rem;
    font-weight: bold;
    color: ${({ theme }) => theme.colors.default};
  }
  input {
    padding: 1rem;
    border: 2px solid grey;
    border-radius: 1rem;

    //起始為0
    width: 35rem;
    width: ${(prop) => prop.$width || "35rem"};
  }
`;

export const OptText = styled(Link)`
  font-size: 1rem;
  font-weight: bold;
  text-align: center;
  cursor: pointer;
  margin-top: 0.5rem;
  color: ${({ theme }) => theme.colors.cursor};
`;

export const Divider = styled.div`
  display: flex;
  align-items: center;
  width: 100%;
  color: ${({ theme }) => theme.colors.default};
  font-size: 14px;

  &::before,
  &::after {
    content: "";
    flex: 1;
    height: 1px;
    background-color: #444; /* 線條顏色 */
    //background-color: #333; /* 線條顏色 */

    margin: 0 12px;
  }
`;

export const ErrBox = styled.div``;
export const ErrMes = styled.p`
  color: blueviolet;
`;
export const Google = styled(GoogleIcon)`
  color: ${({ theme }) => theme.colors.default};
`;
