import { useRef, useEffect } from "react";
import {
  disableBodyScroll,
  enableBodyScroll,
  clearAllBodyScrollLocks,
} from "body-scroll-lock";

export const useScrollBlock = (targetRef) => {
  const isLocked = useRef(false);

  const blockScroll = () => {
    if (targetRef.current && !isLocked.current) {
      const scrollBarWidth =
        window.innerWidth - document.documentElement.clientWidth;
      document.body.style.paddingRight = `${scrollBarWidth}px`;

      disableBodyScroll(targetRef.current, {
        reserveScrollBarGap: true,
        allowTouchMove: (e) => {
          return e.tagName === "INPUT";
        },
      });
      isLocked.current = true;
    }
  };

  const allowScroll = () => {
    if (targetRef.current && isLocked.current) {
      enableBodyScroll(targetRef.current);
      document.body.style.paddingRight = "";
      isLocked.current = false;
    }
  };

  useEffect(() => {
    return () => {
      clearAllBodyScrollLocks();
    };
  }, []);

  return [blockScroll, allowScroll];
};
