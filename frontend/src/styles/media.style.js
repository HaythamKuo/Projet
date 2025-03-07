// media.js
import { css } from "styled-components";

const media = {
  // 這裡我們根據主題中的 breakpoints 生成一個函式
  // 注意：這個工具函式會在 styled-components 中被調用，
  // 所以我們可以透過 props.theme 來取得當前主題中的斷點
  md: (...args) => css`
    @media (min-width: ${(props) => props.theme.breakpoints.md}) {
      ${css(...args)}
    }
  `,
  lg: (...args) => css`
    @media (min-width: ${(props) => props.theme.breakpoints.lg}) {
      ${css(...args)}
    }
  `,
  xl: (...args) => css`
    @media (min-width: ${(props) => props.theme.breakpoints.xl}) {
      ${css(...args)}
    }
  `,
  "2xl": (...args) => css`
    @media (min-width: ${(props) => props.theme.breakpoints["2xl"]}) {
      ${css(...args)}
    }
  `,
};

export default media;
