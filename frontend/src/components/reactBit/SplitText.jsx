import { useSprings, animated } from "@react-spring/web";
import { useEffect, useRef, useState } from "react";
import styled from "styled-components";

const SplitParent = styled.p`
  text-align: ${(props) => props.textAlign || "center"};
  overflow: hidden;
  display: inline;

  white-space: normal;
  word-wrap: break-word;
  color: ${({ theme }) => theme.colors.default};
  ${(props) => props.$customStyles};
`;

const WordWrapper = styled.span`
  display: inline-block;
  white-space: nowrap;
`;

const SpaceSpan = styled.span`
  display: inline-block;
  width: 0.3em;
`;

// Animated letter - need to use styled() on the animated component
const AnimatedLetter = styled(animated.span)`
  display: inline-block;
  will-change: transform, opacity;
`;

const SplitText = ({
  text = "",
  customStyles = "",
  delay = 100,
  animationFrom = { opacity: 0, transform: "translate3d(0,40px,0)" },
  animationTo = { opacity: 1, transform: "translate3d(0,0,0)" },
  easing = "easeOutCubic",
  threshold = 0.1,
  rootMargin = "-100px",
  textAlign = "center",
  onLetterAnimationComplete,
}) => {
  const words = text.split(" ").map((word) => word.split(""));

  const letters = words.flat();
  const [inView, setInView] = useState(false);
  const ref = useRef();
  const animatedCount = useRef(0);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setInView(true);
          observer.unobserve(ref.current);
        }
      },
      { threshold, rootMargin }
    );

    observer.observe(ref.current);

    return () => observer.disconnect();
  }, [threshold, rootMargin]);

  const springs = useSprings(
    letters.length,
    letters.map((_, i) => ({
      from: animationFrom,
      to: inView
        ? async (next) => {
            await next(animationTo);
            animatedCount.current += 1;
            if (
              animatedCount.current === letters.length &&
              onLetterAnimationComplete
            ) {
              onLetterAnimationComplete();
            }
          }
        : animationFrom,
      delay: i * delay,
      config: { easing },
    }))
  );

  return (
    <SplitParent ref={ref} textAlign={textAlign} $customStyles={customStyles}>
      {words.map((word, wordIndex) => (
        <WordWrapper key={wordIndex}>
          {word.map((letter, letterIndex) => {
            const index =
              words.slice(0, wordIndex).reduce((acc, w) => acc + w.length, 0) +
              letterIndex;

            return (
              <AnimatedLetter key={index} style={springs[index]}>
                {letter}
              </AnimatedLetter>
            );
          })}
          <SpaceSpan>&nbsp;</SpaceSpan>
        </WordWrapper>
      ))}
    </SplitParent>
  );
};

export default SplitText;
