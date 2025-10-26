import styled from "styled-components";

export const LayoutContainer = styled.div`
  width: 100%;
  max-width: 1280px;
  padding: 0 clamp(1rem, 4vw, 4rem);
  margin: 0 auto;

  ${(props) => props.theme.media.xxl} {
    padding: 0 16rem;
    /* background-color: gold; */
  }

  ${(props) => props.theme.media.xl} {
    padding: 0 8rem;
    background-color: cadetblue;
  }

  ${(props) => props.theme.media.lg} {
    padding: 0 4rem;
    background-color: blue;
  }

  ${(props) => props.theme.media.md} {
    padding: 0 2rem;
    background-color: brown;
  }
`;
