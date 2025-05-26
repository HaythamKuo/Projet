import { useState, useEffect, useRef } from "react";

function useIntersectionObserver({ delay, threshold, rootMargin }) {
  const ref = useRef(null);
  const [inView, setInView] = useState(false);

  useEffect(() => {
    const obsNode = ref.current;
    if (!obsNode) return;

    let timeID;

    const handleIntersecting = function (items) {
      items.forEach((item) => {
        if (item.isIntersecting) {
          clearTimeout(timeID);

          timeID = setTimeout(() => setInView(true), delay);
        } else {
          clearTimeout(timeID);

          setInView(false);
        }
      });
    };

    const observer = new IntersectionObserver(handleIntersecting, {
      threshold,
      rootMargin,
    });
    observer.observe(obsNode);

    return () => {
      clearTimeout(timeID);

      if (obsNode) observer.disconnect(obsNode);
    };
  }, [delay, threshold, rootMargin]);

  return [ref, inView];
}

export { useIntersectionObserver };
