import styled from "styled-components";
import { forwardRef, useEffect } from "react";

import { createPortal } from "react-dom";
import { flexCenter } from "../styles/theme";

const DialogContainer = styled.dialog`
  background-color: ${({ theme }) => theme.card.specificBack};
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
  min-height: 200px;

  max-height: ${(prop) => prop.$minorHeight && prop.$minorHeight};
  height: ${(prop) => prop.$minorHeight && prop.$minorHeight};

  background-color: ${({ theme }) => theme.colors.convertBeige};

  ${flexCenter}
  flex-direction: ${(prop) => prop.$direction || "column"};
  gap: 1rem;
`;

/**
 * A reusable modal component built on the native <dialog> element
 * and rendered via React Portal.
 *
 * - 會將內容透過 `createPortal` 掛載到指定的 DOM 節點（id="modal"）。
 * - 透過 `isOpen` 控制開關，並自動呼叫 `dialog.showModal()` / `dialog.close()`。
 * - 可自訂寬高，並在關閉時觸發 `onClose`。
 *
 * @component
 * @example
 * // 需在 index.html 中建立 <div id="modal"></div>
 * const dialogRef = useRef(null);
 *
 * <Modal
 *   ref={dialogRef}
 *   isOpen={isModalOpen}
 *   onClose={() => setModalOpen(false)}
 *   width="400px"
 *   height="300px"
 * >
 *   <p>這裡是內容</p>
 * </Modal>
 *
 * @param {Object} props
 * @param {boolean} props.isOpen - 是否開啟 Modal。
 * @param {React.ReactNode} props.children - Modal 內要呈現的內容。
 * @param {() => void} [props.onClose] - 當使用者關閉 Modal 時觸發的回呼函式。
 * @param {string} [props.height] - Modal 高度，預設為 "auto"。
 * @param {string} [props.width] - Modal 寬度，預設為 "50%"。
 * @param {React.RefObject<HTMLDialogElement>} ref - 供外部取得 dialog DOM 節點的 ref。
 *
 * @returns {React.ReactPortal|null} 透過 createPortal 渲染的對話框，
 *   如果找不到 #modal 節點則回傳 null。
 */

const Modal = forwardRef(function Modal(
  { isOpen, children, onClose, height, width, minorHeight, direction },
  ref
) {
  //const scrollRef = useRef(0);
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

  // 由React處理 ESC 關閉
  useEffect(() => {
    const dialog = ref.current;
    if (!dialog) return;

    const handleCancel = (e) => {
      e.preventDefault(); // 阻止原生自動關閉
      onClose?.(); // 改成由 React 控制關閉
    };

    dialog.addEventListener("cancel", handleCancel);
    return () => dialog.removeEventListener("cancel", handleCancel);
  }, [ref, onClose]);

  if (!modalRoot) return null;

  return createPortal(
    <DialogContainer ref={ref} width={width} height={height} onClose={onClose}>
      <ContentBox $minorHeight={minorHeight} $direction={direction}>
        {children}
      </ContentBox>
    </DialogContainer>,
    modalRoot
  );
});
export default Modal;
