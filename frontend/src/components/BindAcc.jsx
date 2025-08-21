//import { useEffect } from "react";
import styled from "styled-components";

import { FaGoogle } from "react-icons/fa";
//import { toast } from "react-toastify";

const BindContainer = styled.div`
  /* background-color: red; */
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 2rem;
`;
const GoogleIcon = styled(FaGoogle)`
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
  //console.log(disable);

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

      <GoogleIcon />
    </BindContainer>
  );
}
