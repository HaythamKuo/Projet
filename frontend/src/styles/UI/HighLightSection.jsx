import { Fragment } from "react";
import styled from "styled-components";
import { imgBasicStyle } from "../theme";

//大容器裡有兩個小容器 根據版面不同有不同排序

const HighLightComponent = styled.div`
  display: flex;
  align-items: center;
  margin-top: 1rem;

  //用prop來換
  flex-direction: ${(prop) => prop.$attrs || "row"};
`;

const TextWrapper = styled.div`
  text-align: center;
  padding: 24px;
  flex: 1;

  .wrapper_title {
    //用prop來換
    font-size: 3.5rem;
    font-weight: bolder;
  }

  .wrapper_des {
  }
`;

const ImgWrapper = styled.div`
  width: 100%;
  overflow: hidden;
  flex: 2;
  border-radius: 8px;
  aspect-ratio: 4 / 3;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.15);

  img {
    ${imgBasicStyle}
  }
`;

//title, description, img, 皆為prop
function HighLightSection({ $attrs, ...res }) {
  return (
    <Fragment>
      <HighLightComponent $attrs={$attrs}>
        <TextWrapper>
          <h1 className="wrapper_title">prop標題</h1>
          <span className="wrapper_des">
            some The Koala Modern Sofa is the 2024 Product Review Award Winner.
            Greedy with the spotlight, but generous with comfort features and
            luxury perks for less.
          </span>
        </TextWrapper>

        <ImgWrapper>
          {/* <img src="/golden-2.jpg" alt="dog" /> */}
          <img {...res} />
        </ImgWrapper>
      </HighLightComponent>
    </Fragment>
  );
}
export default HighLightSection;
