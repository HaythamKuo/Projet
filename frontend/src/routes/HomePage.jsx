import HightLight from "../styles/UI/HighLight";
import { HeaderLayout } from "../styles/header.style";
import {
  HomeContainer,
  CenterOfHome,
  AttributesContainer,
  ProdDesc,
} from "../styles/homePage.style";
import TypeWriter, { TypeWriterContainer } from "../components/TypeWriter";
import Attribute from "../components/Attribute";
import IntroTitle from "../components/reactBit/IntroTitle";
import SpotlightCard from "../components/SpotlightCard";
import Image from "../components/Image";

const titles = ["娃娃", "運送服務", "情緒價值"];

function HomePage() {
  return (
    <HomeContainer>
      <HeaderLayout>
        <HightLight />
        <TypeWriterContainer>
          <span>I am</span>
          <TypeWriter
            phrases={["a developer", "a designer", "an innovator"]}
            typingSpeed={80}
            deletingSpeed={40}
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
          center="center"
        />
        <ProdDesc>
          <Image src="/golden-2.jpg" alt="handsome boy" w={850} h={350} />

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
          <Image src="/husky-1.jpg" alt="handsome boy" w={850} h={350} />

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
    </HomeContainer>
  );
}
export default HomePage;
