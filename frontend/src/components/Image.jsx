import { useState, useEffect } from "react";
import { IKImage } from "imagekitio-react";
import styled from "styled-components";

const StyledIKImage = styled(IKImage)`
  max-width: 1060px;
  width: 100%;

  //border-radius: ${(p) => `${p.$borderRadius} ${p.$borderRadius} 0 0`};
  border-radius: ${(p) =>
    p.$topOnly ? `${p.$borderRadius} ${p.$borderRadius} 0 0` : p.$borderRadius};
  object-fit: cover;

  //rwd
  ${({ theme }) => theme.media.md} {
    width: 100%; // 垂直排列時保持一致寬度
    max-width: 660px; // 最大寬度限制
  }

  ${({ flex }) => flex && `flex:${flex}`}//rwd
`;

function Image({
  src,
  className,
  w,
  h,
  alt,
  borderRadius = "0.75rem",
  flex,
  topOnly,
  ...rest
}) {
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
      $borderRadius={borderRadius}
      loading="lazy"
      lqip={{ active: true, quality: 20 }}
      flex={flex}
      urlEndpoint={urlEndpoint}
      alt={alt || "default image"}
      width={w}
      height={h}
      $topOnly={topOnly}
      {...rest}
    />
  );
}

export default Image;
