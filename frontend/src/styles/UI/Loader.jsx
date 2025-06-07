import styled from "styled-components";
import { flexCenter } from "../theme";

const Loader = ({ $heightlight, ...rest }) => {
  return (
    <StyledWrapper {...rest} $heightlight={$heightlight}>
      <div className="loader" />
    </StyledWrapper>
  );
};

const StyledWrapper = styled.div`
  ${flexCenter}
  position:absolute;
  top: 50%;
  left: 50%;
  width: ${(prop) => prop.width}px;
  height: ${(prop) => prop.height}px;
  z-index: ${(prop) => (prop.$heightlight ? prop.$heightlight : 1000)};

  /* .loader {
    border: 4px solid rgba(0, 0, 0, 0.1);

    border-left-color: transparent;

    border-radius: 50%;
  }

  .loader {
    border: 4px solid rgba(0, 0, 0, 0.1);
    border-left-color: transparent;
    width: 36px;
    height: 36px;
  }

  .loader {
    border: 4px solid rgba(0, 0, 0, 0.1);
    border-left-color: transparent;
    width: 36px;
    height: 36px;
    animation: spin89345 1s linear infinite;
  } */

  .loader {
    //border: 4px solid rgba(0, 0, 0, 0.1);
    border: 4px solid white;
    border-left-color: transparent;
    border-radius: 50%;
    width: 36px;
    height: 36px;
    animation: spin89345 1s linear infinite;
  }

  @keyframes spin89345 {
    0% {
      transform: rotate(0deg);
    }

    100% {
      transform: rotate(360deg);
    }
  }
`;

export default Loader;
