import { toast } from "react-toastify";
import styled from "styled-components";

import { FaGoogle } from "react-icons/fa";
import { LineIcon } from "../styles/Checkout.style";
import { flexCenter } from "../styles/theme";
import { useThird_party_unbindMutation } from "../store/apis/apiSlice";
import ProcessLoader from "../styles/UI/ProcessLoader";

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

const UnBindBtn = styled.button``;

export default function BindAcc({ googleId, lineId }) {
  const [unBindAcc, { isLoading: unBinding }] = useThird_party_unbindMutation();

  async function unBind(provider) {
    try {
      const res = await unBindAcc(provider).unwrap();
      toast.success(res?.message);
    } catch (error) {
      console.error(error);
    }
  }

  if (unBinding) return <ProcessLoader />;

  return (
    <BindContainer>
      <BindBox>
        <GoogleIcon />
        {googleId ? (
          <>
            <BindSuccess>成功綁定</BindSuccess>
            <UnBindBtn disabled={unBinding} onClick={() => unBind("google")}>
              解除綁定
            </UnBindBtn>
          </>
        ) : (
          <BindDesc>
            <AnchorLink
              href={`
                ${
                  import.meta.env.DEV
                    ? import.meta.env.VITE_SERVER_DEV
                    : import.meta.env.VITE_SERVER_PRODUCTION
                }/api/google/auth/google/bind
                `}
            >
              綁定至Google
            </AnchorLink>
          </BindDesc>
        )}
      </BindBox>

      <BindBox>
        <LineIcon size="2.2rem" $isCursor />
        {lineId ? (
          <>
            <BindSuccess>成功綁定</BindSuccess>
            <UnBindBtn disabled={unBinding} onClick={() => unBind("line")}>
              解除綁定
            </UnBindBtn>
          </>
        ) : (
          <BindDesc>
            <AnchorLink
              href={`
                ${
                  import.meta.env.DEV
                    ? import.meta.env.VITE_SERVER_DEV
                    : import.meta.env.VITE_SERVER_PRODUCTION
                }/api/line/bind
                `}
            >
              綁定至Line
            </AnchorLink>
          </BindDesc>
        )}
      </BindBox>
    </BindContainer>
  );
}
