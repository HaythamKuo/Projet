import styled from "styled-components";
import { flexCenter } from "../styles/theme";

const Attributes = ({ title }) => {
  return (
    <StyledWrapper>
      <div className="card">{title}</div>
    </StyledWrapper>
  );
};

const StyledWrapper = styled.div`
  display: flex;
  justify-content: center;

  .card {
    ${flexCenter}
    width:250px;
    height: 254px;
    background: rgba(217, 217, 217, 0.58);
    border: 1px solid white;
    box-shadow: 12px 17px 51px rgba(0, 0, 0, 0.22);
    backdrop-filter: blur(6px);
    border-radius: 17px;
    text-align: center;
    cursor: pointer;
    transition: all 0.5s;
    user-select: none;
    font-weight: bolder;
    font-size: 2rem;
    color: black;
  }

  .card:hover {
    border: 1px solid black;
    transform: scale(1.05);
  }

  .card:active {
    transform: scale(0.95) rotateZ(1.7deg);
  }
`;

export default Attributes;
