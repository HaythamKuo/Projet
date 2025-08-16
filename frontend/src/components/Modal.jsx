import styled from "styled-components";
import { forwardRef, useEffect, useRef } from "react";
import { createPortal } from "react-dom";

const DialogContainer = styled.dialog`
  &:not([open]) {
    display: none;
  }

  /* 只有 open 時才顯示 flex */
  &[open] {
    background-color: red;
    border-radius: 10px;
    width: ${(prop) => prop.width || 50}%;
    height: ${(prop) => prop.height || 50}%;
    display: flex;
    align-items: center;
    justify-content: center;
  }

  &::backdrop {
    background-color: rgba(0, 0, 0, 0.6);
    backdrop-filter: blur(3px);
    transition: opacity 0.3s ease-in-out;
  }
`;

export const ContentBox = styled.div`
  min-width: 500px;
  min-height: 100%;

  background-color: bisque;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  gap: 1rem;
`;

// const Modal = forwardRef(function Modal({ onConfirm }, ref) {
//   return createPortal(
//     <DialogContainer ref={ref}>
//       <ContentBox>
//         <h1>這是彈跳式視窗</h1>
//         <p>確定要刪除嗎</p>
//         <form method="dialog">
//           <button
//             type="submit"
//             onClick={(e) => {
//               e.preventDefault();
//               onConfirm?.();
//             }}
//           >
//             確定
//           </button>
//         </form>
//       </ContentBox>
//     </DialogContainer>,
//     document.getElementById("modal")
//   );
// });
// export default Modal;

//需要被包裹吧children與開關 onClose是？
const Modal = forwardRef(function Modal(
  { isOpen, children, onClose, height, width },
  ref
) {
  //const dialogRef = useRef(null);

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

  //if (!isOpen) return null;

  return createPortal(
    <DialogContainer ref={ref} width={width} height={height} onClose={onClose}>
      <ContentBox>{children}</ContentBox>
    </DialogContainer>,
    document.getElementById("modal")
  );
});
export default Modal;
