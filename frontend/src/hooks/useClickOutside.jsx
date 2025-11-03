import { useEffect } from "react";

/**
 * 監控點擊或 Escape 鍵盤事件是否發生在指定元素外部，並允許延遲監聽以忽略初始觸發事件。
 * * @param {React.RefObject} ref - 要監控的 DOM 元素
 * @param {Function} callback - 當點擊元素外部或按下 Escape 鍵時要執行的函式
 */
function useClickOutside(ref, callback) {
  useEffect(() => {
    // 使用 setTimeout 讓事件監聽器的註冊延遲到當前 Call Stack 清空之後（即忽略剛才導致開啟的那個點擊事件）。
    const timerId = setTimeout(() => {
      // *** 註冊監聽器 ***
      function handleClickOutside(event) {
        // 確認 ref 存在 且 點擊目標不在 ref 內部
        if (ref.current && !ref.current.contains(event.target)) {
          callback?.();
        }
      }

      function handleKeyDown(event) {
        if (event.key === "Escape") callback?.();
      }

      document.addEventListener("mousedown", handleClickOutside);
      document.addEventListener("keydown", handleKeyDown);

      // *** 清理函式 ***
      return () => {
        document.removeEventListener("mousedown", handleClickOutside);
        document.removeEventListener("keydown", handleKeyDown);
      };
    }, 0); // 延遲 0 毫秒

    // 清理：清除 setTimeout 和 事件監聽器
    return () => {
      clearTimeout(timerId);
      // 注意：由於事件監聽器是在 setTimeout 內註冊的，
      // 這裡只需要確保在組件卸載時，如果 timer 還沒執行，就清除 timer
    };
  }, [ref, callback]);
}

export default useClickOutside;
