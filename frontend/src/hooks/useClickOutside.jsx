import { useEffect } from "react";

/**
 * @param {React.RefObject} ref - 要監控的 DOM 元素
 * @param {Function} callback - 當點擊元素外部時要執行的函式
 * @param {() => void} callback - 當點擊外部或按下 `Escape` 鍵時要執行的函式，例如：關閉搜尋框、Modal 等。
 */
function useClickOutside(ref, callback) {
  useEffect(() => {
    function handleClickOutside(event) {
      if (ref.current && !ref.current.contains(event.target)) {
        callback?.();
      }
    }

    function handleKeyDown(event) {
      if (event.key === "Escape") callback?.();
    }

    document.addEventListener("mousedown", handleClickOutside);
    document.addEventListener("keydown", handleKeyDown);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [ref, callback]);
}

export default useClickOutside;
