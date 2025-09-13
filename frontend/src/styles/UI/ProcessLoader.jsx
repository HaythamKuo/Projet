import styled, { keyframes } from "styled-components";
import { flexCenter } from "../theme";

const fadeIn = keyframes`
  from { opacity: 0; }
  to { opacity: 1; }
`;

export const OverLay = styled.div`
  inset: 0;
  position: fixed;
  background: rgba(0, 0, 0, 0.5);
  animation: ${fadeIn} 0.3s ease;
  z-index: 999;
  ${flexCenter}
`;

const StyledWrapper = styled.div`
  .dot-wave {
    --uib-size: 50px;
    --uib-speed: 0.6s;
    --uib-color: #ffffff;
    display: flex;
    flex-flow: row nowrap;
    align-items: center;
    justify-content: space-between;
    width: var(--uib-size);
    height: calc(var(--uib-size) * 0.17);
    padding-top: calc(var(--uib-size) * 0.34);
  }

  .dot-wave__dot {
    flex-shrink: 0;
    width: calc(var(--uib-size) * 0.17);
    height: calc(var(--uib-size) * 0.17);
    border-radius: 50%;
    background-color: var(--uib-color);
    will-change: transform;
  }

  .dot-wave__dot:nth-child(1) {
    animation: jump824 var(--uib-speed) ease-in-out
      calc(var(--uib-speed) * -0.45) infinite;
  }

  .dot-wave__dot:nth-child(2) {
    animation: jump824 var(--uib-speed) ease-in-out
      calc(var(--uib-speed) * -0.3) infinite;
  }

  .dot-wave__dot:nth-child(3) {
    animation: jump824 var(--uib-speed) ease-in-out
      calc(var(--uib-speed) * -0.15) infinite;
  }

  .dot-wave__dot:nth-child(4) {
    animation: jump824 var(--uib-speed) ease-in-out infinite;
  }

  @keyframes jump824 {
    0%,
    100% {
      transform: translateY(0px);
    }

    50% {
      transform: translateY(-200%);
    }
  }
`;

const ProcessLoader = () => {
  return (
    <OverLay>
      <StyledWrapper>
        <div className="dot-wave">
          <div className="dot-wave__dot" />
          <div className="dot-wave__dot" />
          <div className="dot-wave__dot" />
          <div className="dot-wave__dot" />
        </div>
      </StyledWrapper>
    </OverLay>
  );
};

export default ProcessLoader;
