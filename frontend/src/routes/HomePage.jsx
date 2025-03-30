import HightLight from "../styles/UI/HighLight";
import { HeaderLayout } from "../styles/header.style";
import TypeWriter, { TypeWriterContainer } from "../components/TypeWriter";
import Attribute from "../components/Attribute";
import IntroTitle from "../components/reactBit/IntroTitle";

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
      <IntroTitle
        text="Isn't this so cool?!"
        delay={150}
        animateBy="words"
        direction="top"
      />
      <Attribute
        as="div"
        className="custom-class"
        color="#20B2AA"
        speed="5s"
        children="hello world"
      />
    </>
  );
}
export default HomePage;
