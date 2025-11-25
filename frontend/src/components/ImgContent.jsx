// import styled from "styled-components";
// import { IKImage } from "imagekitio-react";

// const StyleImage = styled(IKImage)`
//   width: 100%;
//   height: 100%;
//   display: block;
//   object-fit: cover;

//   flex: ${(prop) => prop.flex && prop.flex};
//   //flex: 1;
// `;

// const urlEndpoint = import.meta.env.VITE_IK_URL_ENDPOINT;

// function ImgContent({ src, alt, flex, borderRadius, topOnly, ...rest }) {
//   return (
//     <StyleImage
//       loading="lazy"
//       urlEndpoint={urlEndpoint}
//       lqip={{ active: true, quality: 20 }}
//       path={src}
//       alt={alt || "default image"}
//       flex={flex}
//       topOnly={topOnly}
//       $borderRadius={borderRadius}
//       {...rest}
//     />
//   );
// }
// export default ImgContent;
