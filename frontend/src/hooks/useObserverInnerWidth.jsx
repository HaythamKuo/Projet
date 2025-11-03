import { useEffect, useState } from "react";

function useObserverInnerWidth(width) {
  const [isMobile, setIsMobile] = useState(window.innerWidth < width);

  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth < width);
    window.addEventListener("resize", handleResize);

    return () => window.removeEventListener("resize", handleResize);
  }, [width]);

  return isMobile;
}

export default useObserverInnerWidth;
