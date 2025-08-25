import styled from "styled-components";
import { forwardRef, useEffect } from "react";
import { createPortal } from "react-dom";
import { flexCenter } from "../styles/theme";

const DialogContainer = styled.dialog`
  border: none;
  border-radius: 10px;
  padding: 0;
  width: ${({ width }) => width || "50%"};
  max-width: 90%;
  height: ${({ height }) => height || "auto"};
  ${flexCenter}

  flex-direction: column;
  &:not([open]) {
    display: none;
  }

  &[open] {
    display: flex;
  }

  &::backdrop {
    background-color: rgba(0, 0, 0, 0.6);
    backdrop-filter: blur(3px);
  }
`;

// styled ContentBox
export const ContentBox = styled.div`
  width: 100%;
  //max-width: 500px;
  min-height: 200px;

  background-color: bisque;

  ${flexCenter}
  flex-direction: column;
  gap: 1rem;
`;

//需要被包裹吧children與開關 onClose是？
const Modal = forwardRef(function Modal(
  { isOpen, children, onClose, height, width },
  ref
) {
  const modalRoot = document.getElementById("modal");

  //控制dialog開關
  useEffect(() => {
    const dialog = ref.current;
    if (!dialog) return;

    if (isOpen && !dialog.open) {
      dialog.showModal();
    } else if (!isOpen && dialog.open) {
      dialog.close();
    }
  }, [isOpen, ref]);

  if (!modalRoot) return null;

  return createPortal(
    <DialogContainer ref={ref} width={width} height={height} onClose={onClose}>
      <ContentBox>{children}</ContentBox>
    </DialogContainer>,
    modalRoot
  );
});
export default Modal;
