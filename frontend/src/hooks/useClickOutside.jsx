import { useEffect } from "react";

/**
 * @param {React.RefObject} ref - 要監控的 DOM 元素
 * @param {Function} callback - 當點擊元素外部時要執行的函式
 */
function useClickOutside(ref, callback) {
  useEffect(() => {
    function handleClickOutside(event) {
      if (ref.current && !ref.current.contains(event.target)) {
        callback?.();
      }
    }

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [ref, callback]);
}

export default useClickOutside;
