// import { useRef } from "react";

// export const useScrollBlock = () => {
//   const scroll = useRef(false);

//   const blockScroll = () => {
//     //if (typeof document === "undefined") return;

//     const html = document.documentElement;
//     const { body } = document;

//     if (!body?.style || scroll.current) return;

//     const scrollBarWidth = window.innerWidth - html.clientWidth;
//     const bodyPaddingRight =
//       parseInt(
//         window.getComputedStyle(body).getPropertyValue("padding-right")
//       ) || 0;

//     html.style.position = "relative";
//     body.style.position = "relative";
//     html.style.overflow = "hidden";
//     body.style.overflow = "hidden";
//     body.style.paddingRight = `${bodyPaddingRight + scrollBarWidth}px`;

//     scroll.current = true;
//   };

//   const allowScroll = () => {
//     // if (typeof document === "undefined") return;

//     const html = document.documentElement;
//     const { body } = document;

//     if (!body?.style || !scroll.current) return;

//     html.style.position = "";
//     html.style.overflow = "";
//     body.style.position = "";
//     body.style.overflow = "";
//     body.style.paddingRight = "";

//     scroll.current = false;
//   };

//   return [blockScroll, allowScroll];
// };
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
