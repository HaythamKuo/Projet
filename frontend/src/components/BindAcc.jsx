import { useRef, useState } from "react";
import { toast } from "react-toastify";
import styled from "styled-components";

import { FaGoogle } from "react-icons/fa";
import { LineIcon } from "../styles/Checkout.style";
import { flexCenter } from "../styles/theme";
import { useThird_party_unbindMutation } from "../store/apis/apiSlice";
import ProcessLoader from "../styles/UI/ProcessLoader";
import useHandleErr from "../hooks/userHandleErr";
import Modal from "./Modal";
import { SubmitBtn, CancelBtn } from "../styles/ProdImgGallery.style";
import UnbindBtn from "../styles/UI/UnBindBtn";
import BindBtn from "../styles/UI/BindBtn";
import BehaveBtn from "../styles/UI/BehaveBtn.style";

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

//Modal
const NotifyTitle = styled.h3`
  font-size: 1.5rem;
  font-weight: bold;
  margin-bottom: 1rem;
`;

export default function BindAcc({ googleId, lineId }) {
  const dialogRef = useRef(null);
  const [isOpen, setIsOpen] = useState(false);
  const [isDirect, setIsDirect] = useState(false);
  const [currentProvider, setCurrentProvider] = useState(null);

  useHandleErr();

  const [unBindAcc, { isLoading: unBinding }] = useThird_party_unbindMutation();

  function showModal(provider) {
    if (dialogRef.current && !dialogRef.current.open) {
      setCurrentProvider(provider);
      setIsOpen(true);
    }
  }

  async function unBind(provider) {
    try {
      const res = await unBindAcc(provider).unwrap();
      // console.log(res);

      toast.success(res?.message);
      setCurrentProvider(null);
      setIsOpen(false);
    } catch (error) {
      console.error(error?.data?.message);
      toast.error(error?.data?.message);
    }
  }

  //實現跳轉 → google/line
  function handleForward(provider) {
    if (isDirect) return;
    const option =
      provider === "google" ? "/api/google/auth/google/bind" : "/api/line/bind";

    const finalUrl =
      (import.meta.env.DEV
        ? import.meta.env.VITE_SERVER_DEV
        : import.meta.env.VITE_SERVER_PRODUCTION) + option;
    setIsDirect(true);
    window.location.href = finalUrl;
  }

  if (unBinding) return <ProcessLoader />;

  return (
    <BindContainer>
      <Modal
        ref={dialogRef}
        isOpen={isOpen}
        onClose={() => setIsOpen(false)}
        height="500px"
        width="600px"
      >
        <NotifyTitle>確定要解除綁定嗎？</NotifyTitle>
        <div
          style={{
            display: "flex",
            gap: "2rem",
          }}
        >
          <SubmitBtn
            disabled={unBinding}
            onClick={() => unBind(currentProvider)}
          >
            確定
          </SubmitBtn>
          <CancelBtn onClick={() => setIsOpen(false)}>取消</CancelBtn>
        </div>
      </Modal>

      <BindBox>
        <GoogleIcon />

        {googleId ? (
          // <UnbindBtn
          //   content="解除綁定"
          //   disabled={unBinding}
          //   onClick={() => showModal("google")}
          // />
          <BehaveBtn
            beforeTop="0"
            beforeLeft="0"
            beforeHeight="100%"
            onClick={() => showModal("google")}
          >
            解除綁定
          </BehaveBtn>
        ) : (
          // <BindBtn
          //   disabled={isDirect}
          //   content="綁定至Google"
          //   onClick={() => handleForward("google")}
          // />

          <BehaveBtn
            border="0"
            scaleOnClick
            disabled={isDirect}
            onClick={() => handleForward("google")}
          >
            綁定至Google
          </BehaveBtn>
        )}
      </BindBox>

      <BindBox>
        <LineIcon size="2.2rem" $isCursor />
        {lineId ? (
          // <UnbindBtn
          //   content="解除綁定"
          //   disabled={unBinding}
          //   onClick={() => showModal("line")}
          // />

          <BehaveBtn
            beforeTop="0"
            beforeLeft="0"
            beforeHeight="100%"
            onClick={() => showModal("line")}
          >
            解除綁定
          </BehaveBtn>
        ) : (
          // <BindBtn
          //   content="綁定至Line"
          //   disabled={isDirect}
          //   onClick={() => handleForward("line")}
          // />

          <BehaveBtn
            border="0"
            scaleOnClick
            disabled={isDirect}
            onClick={() => handleForward("line")}
          >
            綁定至Line
          </BehaveBtn>
        )}
      </BindBox>
    </BindContainer>
  );
}
