// import { useState, useEffect } from "react";
// import { IKImage } from "imagekitio-react";

// function Image({ src, className, w, h, alt }) {
//   const [imgReady, setImgReady] = useState(false);

//   useEffect(() => {
//     if (import.meta.env.VITE_IK_URL_ENDPOINT) {
//       setImgReady(true);
//     }
//   }, []);

//   return (
//     <>
//       {imgReady && (
//         <IKImage
//           path={src}
//           className={className}
//           loading="lazy"
//           lqip={{ active: true, quality: 20 }}
//           urlEndpoint={import.meta.env.VITE_IK_URL_ENDPOINT}
//           alt={alt}
//           width={w}
//           height={h}
//         />
//       )}
//     </>
//   );
// }
// export default Image;

import { useState, useEffect } from "react";
import { IKImage } from "imagekitio-react";

function Image({ src, className, w, h, alt }) {
  const [imgReady, setImgReady] = useState(false);
  const urlEndpoint = import.meta.env.VITE_IK_URL_ENDPOINT;

  useEffect(() => {
    if (urlEndpoint) {
      setImgReady(true);
    }
  }, [urlEndpoint]);

  if (!imgReady || !src) {
    return null; // 如果 `src` 為空，則不渲染 `IKImage`
  }

  return (
    <IKImage
      path={src}
      className={className}
      loading="lazy"
      lqip={{ active: true, quality: 20 }}
      urlEndpoint={urlEndpoint}
      alt={alt || "default image"}
      width={w}
      height={h}
    />
  );
}

export default Image;
