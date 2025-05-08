import styled from "styled-components";
import Image from "../../components/Image";

// Styled Components
const ParallaxContainer = styled.section`
  margin-top: 1rem;

  display: flex;
  flex-direction: column;
`;

const Section = styled.div`
  border-radius: 15px;
  width: 100%;
  height: 100vh;

  display: grid;
  place-content: center;
  background-size: cover;
  background-position: center;
  background-attachment: fixed;
  background-image: url(${(props) => props.$bg});

  //rwd
  ${({ theme }) => theme.media.xl} {
    height: 75vh;
  }

  ${({ theme }) => theme.media.md} {
    height: 60vh;
  }
`;

const Title = styled.h1`
  color: #fff;
  font-size: 10rem;
  mix-blend-mode: difference;

  //rwd
  ${({ theme }) => theme.media.xl} {
    font-size: 7rem;
  }

  ${({ theme }) => theme.media.md} {
    font-size: 5rem;
  }
`;

const sections = [
  {
    id: 1,
    text: "Choose",
    bg: "/golden-2.jpg",
  },
  { id: 2, text: "Your", bg: "/husky-2.jpg" },
  { id: 3, text: "dolls", bg: "/golden-2.jpg" },
  { id: 4, text: "Here", bg: "/husky-2.jpg" },
];

const ParallaxSection = () => (
  <ParallaxContainer>
    {sections.map(({ id, text, bg }) => (
      <Section key={id} $bg={bg}>
        <Title>{text}</Title>
      </Section>
    ))}
  </ParallaxContainer>
);

export default ParallaxSection;
