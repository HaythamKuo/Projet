import styled from "styled-components";
//import media from "./media.style";

export const LayoutContainer = styled.div`
  padding: 0 1rem;
  //  height: 100vh;
  margin: 0 auto;

  ${(props) => props.theme.media.md} {
    padding: 0 2rem;
  }

  ${(props) => props.theme.media.lg} {
    padding: 0 4rem;
  }

  ${(props) => props.theme.media.xl} {
    padding: 0 8rem;
  }

  ${(props) => props.theme.media.xxl} {
    padding: 0 16rem;
  }
`;

// px4: "1rem",
// px8: "2rem",
// px16: "4rem",
// px32: "8rem",
// px64: "16rem",
