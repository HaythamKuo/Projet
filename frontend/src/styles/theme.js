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
  colors: { backGround: "#e6e6ff" },
  breakpoints,
  media: generateMedia(breakpoints),
};
export const darkTheme = {
  colors: { backGround: "black" },
  breakpoints,
  media: generateMedia(breakpoints),
};

//flex base
export const flexContainer = css`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;
