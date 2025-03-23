import HightLight from "../styles/UI/HighLight";
import { HeaderLayout } from "../styles/header.style";
import TypeWriter from "../components/TypeWriter";

function HomePage() {
  return (
    <HeaderLayout>
      <HightLight />
      <h1>
        I am
        <TypeWriter
          phrases={["a developer", "a designer", "an innovator"]}
          typingSpeed={80}
          deletingSpeed={40}
          delayAfterPhrase={2000}
        />
      </h1>
    </HeaderLayout>
  );
}
export default HomePage;
