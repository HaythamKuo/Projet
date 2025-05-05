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

// import { useState, useEffect } from "react";
// import { IKImage } from "imagekitio-react";

// function Image({ src, className, w, h, alt }) {
//   const [imgReady, setImgReady] = useState(false);
//   const urlEndpoint = import.meta.env.VITE_IK_URL_ENDPOINT;

//   useEffect(() => {
//     if (urlEndpoint) {
//       setImgReady(true);
//     }
//   }, [urlEndpoint]);

//   if (!imgReady || !src) {
//     return null; // 如果 `src` 為空，則不渲染 `IKImage`
//   }

//   return (
//     <IKImage
//       path={src}
//       className={className}
//       loading="lazy"
//       lqip={{ active: true, quality: 20 }}
//       urlEndpoint={urlEndpoint}
//       alt={alt || "default image"}
//       width={w}
//       height={h}
//     />
//   );
// }

// export default Image;

import { useState, useEffect } from "react";
import { IKImage } from "imagekitio-react";
import styled from "styled-components";

const StyledIKImage = styled(IKImage)`
  //test
  width: 60%;
  max-width: 660px;

  border-radius: 0.75rem;
  object-fit: cover;

  //rwd
  ${({ theme }) => theme.media.md} {
    width: 100%; // 垂直排列時保持一致寬度
    max-width: 660px; // 最大寬度限制
  }

  ${({ flex }) => flex && `flex:${flex}`}//rwd
`;

function Image({ src, className, w, h, alt, borderRadius = "0.75rem", flex }) {
  const [imgReady, setImgReady] = useState(false);
  const urlEndpoint = import.meta.env.VITE_IK_URL_ENDPOINT;

  useEffect(() => {
    if (urlEndpoint) {
      setImgReady(true);
    }
  }, [urlEndpoint]);

  if (!imgReady || !src) {
    return null; // 如果 `src` 为空，则不渲染 `IKImage`
  }

  return (
    <StyledIKImage
      path={src}
      className={className}
      style={{ borderRadius }}
      loading="lazy"
      lqip={{ active: true, quality: 20 }}
      flex={flex}
      urlEndpoint={urlEndpoint}
      alt={alt || "default image"}
      width={w}
      height={h}
    />
  );
}

export default Image;
