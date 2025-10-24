import { Outlet } from "react-router-dom";
import styled from "styled-components";
import { flexCenter } from "../styles/theme";

const AuthLayoutContainer = styled.div`
  width: 100%;
  height: 80vh;
  ${flexCenter}
  ${({ theme }) => theme.media.xxl} {
    margin-top: 1rem;
  }
`;

function AuthLayout() {
  return (
    <AuthLayoutContainer>
      <Outlet />
    </AuthLayoutContainer>
  );
}
export default AuthLayout;
