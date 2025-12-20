import { useEffect, useRef, useState } from "react";
import { AnimatePresence } from "framer-motion";
import HighLight from "../styles/UI/HighLight";
import { HeaderLayout } from "../styles/header.style";
import {
  HomeContainer,
  CenterOfHome,
  AttributesContainer,
  ProdDesc,
  ImgWrapper,
  ImgHover,
  ImgHoverWrapper,
  ImgHoverContainer,
  ImgHoverBox,
  TextWrapper,
  TextHover,
  TextSearch,
  ImgInstance,
  RwdBox,
} from "../styles/homePage.style";

import TypeWriter, {
  TypeSapn,
  TypeWriterContainer,
} from "../components/TypeWriter";
import Attribute from "../components/Attribute";
import IntroTitle from "../components/reactBit/IntroTitle";
import SpotlightCard from "../components/SpotlightCard";
import SearchQuery from "../components/SearchQuery";
import useClickOutside from "../hooks/useClickOutside";
import { useScrollBlock } from "../hooks/useScrollBlock";

const titles = ["娃娃", "運送服務", "情緒價值"];

function HomePage() {
  const [search, setSearch] = useState(false);
  const controlSearch = useRef(null);
  useClickOutside(controlSearch, () => setSearch(false));
  const [blockScroll, allowScroll] = useScrollBlock(controlSearch);

  useEffect(() => {
    if (search) {
      blockScroll();
    } else {
      allowScroll();
    }
  }, [allowScroll, blockScroll, search]);

  return (
    <HomeContainer>
      <HeaderLayout>
        <HighLight />
        <TypeWriterContainer>
          <TypeSapn>這裡有</TypeSapn>

          <TypeWriter
            phrases={["富含溫暖", "質地柔順", "眼底都是你"]}
            typingSpeed={130}
            deletingSpeed={80}
            delayAfterPhrase={2000}
          />
        </TypeWriterContainer>
      </HeaderLayout>
      <CenterOfHome>
        <IntroTitle
          text="我 們 提 供"
          delay={150}
          animateBy="words"
          direction="top"
        />
        <AttributesContainer>
          {titles.map((e) => (
            <Attribute title={e} key={e} />
          ))}
        </AttributesContainer>
      </CenterOfHome>
      <div>
        <IntroTitle
          text="主 打 商 品"
          delay={150}
          animateBy="words"
          direction="up"
          className="test"
          $center="center"
        />
        <ProdDesc>
          <ImgWrapper>
            <ImgInstance src="/golden-2.jpg" alt="handsome boy" />
          </ImgWrapper>
          <SpotlightCard
            className="custom-spotlight-card"
            spotlightColor="rgba(0, 229, 255, 0.2)"
          >
            this is the content dsjakldasjkl asdasd asd
            <br />
            Lorem
            <br />
            ipsum dolor sit amet consectetur, adipisicing elit. Dolorem facere
            officia, aliquam voluptatum expedita eveniet! Itaque quo
            <br />
            illum cumque magni doloremque nobis minima? Debitis, et! Ex
            voluptatum error labore itaque.
          </SpotlightCard>
        </ProdDesc>

        <ProdDesc>
          <ImgWrapper>
            <ImgInstance src="/husky-2.jpg" alt="handsome boy" />
          </ImgWrapper>
          <SpotlightCard
            className="custom-spotlight-card"
            spotlightColor="rgba(0, 229, 255, 0.2)"
          >
            this is the content dsjakldasjkl asdasd asd
            <br />
            Lorem
            <br />
            ipsum dolor sit amet consectetur, adipisicing elit. Dolorem facere
            officia, aliquam voluptatum expedita eveniet! Itaque quo
            <br />
            illum cumque magni doloremque nobis minima? Debitis, et! Ex
            voluptatum error labore itaque.
          </SpotlightCard>
        </ProdDesc>
      </div>

      {/* 動畫特效 */}

      <ImgHoverContainer>
        <IntroTitle
          text="準備好掏出你的錢包了嗎"
          delay={150}
          animateBy="words"
          direction="up"
          $center="center"
        />

        <ImgHoverBox>
          <RwdBox>
            <ImgHoverWrapper>
              <ImgHover>Cat</ImgHover>
            </ImgHoverWrapper>
            <ImgHoverWrapper>
              <ImgHover>Cat</ImgHover>
            </ImgHoverWrapper>
          </RwdBox>

          <TextWrapper onClick={() => setSearch(true)}>
            <TextSearch />
            <TextHover>Search</TextHover>
          </TextWrapper>
          <AnimatePresence>
            {search && <SearchQuery ref={controlSearch} />}
          </AnimatePresence>
        </ImgHoverBox>
      </ImgHoverContainer>
    </HomeContainer>
  );
}
export default HomePage;
