import { css } from "styled-components";

const breakpoints = {
  md: 768,
  lg: 1024,
  xl: 1280,
  xxl: 1536,
};

function generateMedia(breakpoints) {
  return Object.entries(breakpoints).reduce((acc, [key, value]) => {
    acc[key] = `@media (min-width: ${value}px)`;
    return acc;
  }, {});
}

export const lightTheme = {
  colors: {
    backGround: "#e6e6ff",
    boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
    dark: "#1B1B1D",
  },
  breakpoints,
  media: generateMedia(breakpoints),
};
export const darkTheme = {
  colors: {
    backGround: "#1B1B1D",
    boxShadow:
      "0 4px 15px rgba(255, 255, 255, 0.3), 0 2px 10px rgba(255, 255, 255, 0.2)",
    white: "#e6e6ff",
  },
  breakpoints,
  media: generateMedia(breakpoints),
};

//flex base
export const flexContainer = css`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;
export const flexCenter = css`
  display: flex;
  justify-content: center;
  align-items: center;
`;
