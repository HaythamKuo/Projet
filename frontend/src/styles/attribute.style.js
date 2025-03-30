import styled, { keyframes } from "styled-components";

// Keyframes
const starMovementBottom = keyframes`
  0% {
    transform: translate(0%, 0%);
    opacity: 1;
  }
  100% {
    transform: translate(-100%, 0%);
    opacity: 0;
  }
`;

const starMovementTop = keyframes`
  0% {
    transform: translate(0%, 0%);
    opacity: 1;
  }
  100% {
    transform: translate(100%, 0%);
    opacity: 0;
  }
`;

// button
export const StarBorderContainer = styled.button`
  display: inline-block;
  padding: 1px 0;
  position: relative;
  border-radius: 20px;
  overflow: hidden;
  cursor: pointer;
`;

//container border
export const BorderGradientBottom = styled.div`
  position: absolute;
  width: 300%;
  height: 50%;
  opacity: 0.7;
  bottom: -11px;
  right: -250%;
  border-radius: 50%;
  animation: ${starMovementBottom} linear infinite alternate;
  z-index: 0;
  background: ${(props) =>
    `radial-gradient(circle, ${props.color}, transparent 10%)`};
  animation-duration: ${(props) => props.speed};
`;

export const BorderGradientTop = styled.div`
  position: absolute;
  opacity: 0.7;
  width: 300%;
  height: 50%;
  top: -10px;
  left: -250%;
  border-radius: 50%;
  animation: ${starMovementTop} linear infinite alternate;
  z-index: 0;
  background: ${(props) =>
    `radial-gradient(circle, ${props.color}, transparent 10%)`};
  animation-duration: ${(props) => props.speed};
`;

export const InnerContent = styled.div`
  position: relative;

  //dark
  //background: linear-gradient(to bottom, #060606, #111);

  //light
  background: linear-gradient(to bottom, #f5f5dc, #e8e8d0);

  //dark
  //border: 1px solid #222;

  //light
  border: 1px sold #e6e6c9;

  //dark
  color: white;

  //light
  color: #333333;

  font-size: 16px;
  text-align: center;
  padding: 16px 26px;
  border-radius: 20px;
  z-index: 1;
`;
