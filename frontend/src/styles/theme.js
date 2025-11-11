import { css } from "styled-components";

const breakpoints = {
  md: 768,
  lg: 1024,
  xl: 1280,
  xxl: 1536,
};

function generateMedia(breakpoints) {
  // 排序所有斷點
  const sortedBreakpoints = Object.entries(breakpoints).sort(
    ([_, a], [__, b]) => b - a
  ); // 從大到小排序

  return sortedBreakpoints.reduce((acc, [key, value]) => {
    acc[key] = `@media (max-width: ${value}px)`;
    return acc;
  }, {});
}

export const lightTheme = {
  colors: {
    backGround: "#e6e6ff",
    boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
    default: "#1B1B1D",
    typeWriter: "#fb5607",
    cursor: "#ff9e00",
    specificShadow: "12px 17px 51px rgba(0, 0, 0, 0.22)",
    convertBeige: "beige",
    gradientColor: `linear-gradient(
    120deg,
    rgba(0, 0, 255, 0) 40%,
    rgba(0, 0, 255, 0.8) 50%,
    rgba(0, 0, 255, 0) 60%
  )`,
  },
  spotLight: {
    backGround: "#f5f5f5",
    border: "#e0e0e0",
    color: "#333333",
    spotColor: "rgba(0, 0, 0, 0.05)",
    rating: "#555",
  },
  card: {
    backGround: "#f4f4f4",
    specificBack: "white",
  },
  button: {
    hovers: "#001a35",
    hoverSearch: "#d6d6d6",
    backGround: "#007bff",
    direct: "#707070",
    ckBackGround: "#E9E9ED",
  },

  breakpoints,
  media: generateMedia(breakpoints),
};
export const darkTheme = {
  colors: {
    backGround: "#1B1B1D",
    boxShadow:
      "0 4px 15px rgba(255, 255, 255, 0.3), 0 2px 10px rgba(255, 255, 255, 0.2)",
    default: "#e6e6ff",
    typeWriter: "#ffbd00",
    cursor: "#ffd166",
    specificShadow: "12px 17px 51px rgba(255, 255, 255, 0.22)",
    convertBeige: "#373735",
    gradientColor: `linear-gradient(
    120deg,
    rgba(255, 255, 255, 0) 40%,
    rgba(255, 255, 255, 0.8) 50%,
    rgba(255, 255, 255, 0) 60%
  )`,
  },
  spotLight: {
    backGround: "#111111",
    border: "#222222",
    color: "#ffffff",
    spotColor: "rgba(255, 255, 255, 0.25)",
    rating: "#ff9e00",
  },
  card: {
    backGround: "black",
    specificBack: "#434c46",
  },
  button: {
    hovers: "#f2f2f2",
    hoverSearch: "#111111",
    backGround: "#0ea5e9",
    direct: "#e6e6ff",
    ckBackGround: "#686464",
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

// 圖片固定格式
export const imgBasicStyle = css`
  display: block;
  height: 100%;
  width: 100%;
  object-fit: cover;
`;
