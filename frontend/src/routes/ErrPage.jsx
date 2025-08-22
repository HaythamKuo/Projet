import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { motion, useAnimation, useMotionValue } from "framer-motion";

import styled from "styled-components";
import { flexCenter } from "../styles/theme";

const CircularWrapper = styled(motion.div)`
  //margin: 0 auto;
  position: relative;
  width: 200px;
  height: 200px;
  border-radius: 50%;

  &::before {
    content: "";
    position: absolute;
    inset: 0;
    border-radius: 50%;
    cursor: pointer;
  }
`;

const Letter = styled.span`
  position: absolute;
  display: inline-block;
  inset: 0;
  font-size: 24px;
  transition: all 0.5s cubic-bezier(0, 0, 0, 1);
`;

const CircularContainer = styled.div`
  //background-color: black;
  height: 100vh;

  ${flexCenter}
  flex-direction: column;
  gap: 2rem;
`;

const CircularDes = styled.span``;

const HomeButton = styled(motion.button)`
  padding: 12px 24px;
  border: none;
  border-radius: 8px;
  background: #4a90e2;
  color: #fff;
  font-size: 16px;
  font-weight: bold;
  cursor: pointer;
  outline: none;
`;

const getRotationTransition = (duration, from, loop = true) => ({
  from,
  to: from + 360,
  ease: "linear",
  duration,
  type: "tween",
  repeat: loop ? Infinity : 0,
});

const getTransition = (duration, from) => ({
  rotate: getRotationTransition(duration, from),
  scale: {
    type: "spring",
    damping: 20,
    stiffness: 300,
  },
});

const ErrPage = ({
  text,
  spinDuration = 20,
  onHover = "speedUp",
  className = "",
}) => {
  const letters = Array.from(text);
  const controls = useAnimation();
  const rotation = useMotionValue(0);

  const navigate = useNavigate();

  useEffect(() => {
    const start = rotation.get();
    controls.start({
      rotate: start + 360,
      scale: 1,
      transition: getTransition(spinDuration, start),
    });
  }, [spinDuration, text, onHover, controls, rotation]);

  const handleHoverStart = () => {
    const start = rotation.get();
    if (!onHover) return;

    let transitionConfig;
    let scaleVal = 1;

    switch (onHover) {
      case "slowDown":
        transitionConfig = getTransition(spinDuration * 2, start);
        break;
      case "speedUp":
        transitionConfig = getTransition(spinDuration / 4, start);
        break;
      case "pause":
        transitionConfig = {
          rotate: { type: "spring", damping: 20, stiffness: 300 },
          scale: { type: "spring", damping: 20, stiffness: 300 },
        };
        break;
      case "goBonkers":
        transitionConfig = getTransition(spinDuration / 20, start);
        scaleVal = 0.8;
        break;
      default:
        transitionConfig = getTransition(spinDuration, start);
    }

    controls.start({
      rotate: start + 360,
      scale: scaleVal,
      transition: transitionConfig,
    });
  };

  const handleHoverEnd = () => {
    const start = rotation.get();
    controls.start({
      rotate: start + 360,
      scale: 1,
      transition: getTransition(spinDuration, start),
    });
  };

  return (
    <CircularContainer>
      <CircularWrapper
        className={className}
        style={{ rotate: rotation }}
        initial={{ rotate: 0 }}
        animate={controls}
        onMouseEnter={handleHoverStart}
        onMouseLeave={handleHoverEnd}
      >
        {letters.map((letter, i) => {
          const rotationDeg = (360 / letters.length) * i;
          const transform = `rotateZ(${rotationDeg}deg) translate(90px)`;

          return (
            <Letter key={i} style={{ transform, WebkitTransform: transform }}>
              {letter}
            </Letter>
          );
        })}
      </CircularWrapper>
      <CircularDes>看來你誤闖不該看到的頁面了</CircularDes>
      <HomeButton
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{
          duration: 0.6,
          ease: "easeOut",
          type: "spring",
          stiffness: 120,
        }}
        whileHover={{ scale: 1.1, backgroundColor: "#357ABD" }}
        whileTap={{ scale: 0.9 }}
        onClick={() => navigate("/")}
      >
        回首頁
      </HomeButton>
    </CircularContainer>
  );
};

export default ErrPage;
