import HightLight from "../styles/UI/HighLight";
import { HeaderLayout } from "../styles/header.style";
import TypeWriter, { TypeWriterContainer } from "../components/TypeWriter";

function HomePage() {
  return (
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
  );
}
export default HomePage;
