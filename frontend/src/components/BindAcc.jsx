//import { useEffect } from "react";
import styled from "styled-components";

import { FaGoogle } from "react-icons/fa";
import { LineIcon } from "../styles/Checkout.style";
import { flexCenter } from "../styles/theme";

const BindContainer = styled.div`
  ${flexCenter}
  gap: 2rem;
`;
export const GoogleIcon = styled(FaGoogle)`
  font-size: 2rem;
  color: ${({ theme }) => theme.colors.default};
`;

const BindBox = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 1rem;
`;
const BindDesc = styled.button`
  border: none;
  background-color: transparent;

  &:hover {
    background-color: none;
  }
`;

const BindSuccess = styled.span`
  color: ${({ theme }) => theme.colors.default};
  font-size: 1rem;
`;

const AnchorLink = styled.a`
  color: ${({ theme }) => theme.colors.default};
`;

export default function BindAcc({ googleId }) {
  return (
    <BindContainer>
      <BindBox>
        <GoogleIcon />
        {/* <BindDesc disabled={!!googleId}>
          <a href="http://localhost:5001/api/google/auth/google">
            綁定至Google
          </a>
        </BindDesc> */}
        {/* <a href="http://localhost:5001/api/google/auth/google">綁定至Google</a> */}

        {googleId ? (
          <BindSuccess>成功綁定</BindSuccess>
        ) : (
          <BindDesc>
            <AnchorLink href="http://localhost:5001/api/google/auth/google/bind">
              綁定至Google
            </AnchorLink>
          </BindDesc>
        )}
      </BindBox>

      <BindBox>
        <LineIcon size="2.2rem" />
        {/* <a href="">綁定至Line</a> */}
        <BindDesc disabled>即將開放</BindDesc>
      </BindBox>
    </BindContainer>
  );
}
