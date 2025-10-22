//import { useEffect } from "react";
import styled from "styled-components";

import { FaGoogle } from "react-icons/fa";
import { LineIcon } from "../styles/Checkout.style";
//import { toast } from "react-toastify";

const BindContainer = styled.div`
  /* background-color: red; */
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 2rem;
`;
export const GoogleIcon = styled(FaGoogle)`
  font-size: 2rem;
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
  a {
    color: black;
  }
`;

const BindSuccess = styled.span`
  font-size: 1rem;
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
            <a href="http://localhost:5001/api/google/auth/google/bind">
              綁定至Google
            </a>
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
