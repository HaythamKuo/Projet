import HightLight from "../styles/UI/HighLight";
import { HeaderLayout } from "../styles/header.style";
import { CenterOfHome, AttributesContainer } from "../styles/homePage.style";
import TypeWriter, { TypeWriterContainer } from "../components/TypeWriter";
import Attribute from "../components/Attribute";
import IntroTitle from "../components/reactBit/IntroTitle";

const titles = ["娃娃", "運送服務", "情緒價值"];

function HomePage() {
  return (
    <>
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
    </>
  );
}
export default HomePage;
