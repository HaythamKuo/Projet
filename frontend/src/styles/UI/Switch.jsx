import { useState } from "react";
import styled from "styled-components";

const Switch = ({ onClick }) => {
  const [check, setChecked] = useState(false);

  function handleClick() {
    setChecked(!check);
    onClick();
  }

  return (
    <StyledWrapper>
      <div className="toggle-switch">
        <label className="switch-label">
          <input
            type="checkbox"
            className="checkbox"
            onChange={handleClick}
            checked={check}
          />
          <span className="slider" />
        </label>
      </div>
    </StyledWrapper>
  );
};

const StyledWrapper = styled.div`
  .toggle-switch {
    position: relative;
    width: 60px;
    height: 40px;
    --light: #d8dbe0;
    --dark: #28292c;
    --link: rgb(27, 129, 112);
    --link-hover: rgb(24, 94, 82);
  }

  .switch-label {
    position: absolute;
    width: 100%;
    height: 40px;
    background-color: var(--dark);
    border-radius: 20px;
    cursor: pointer;
    border: 3px solid var(--dark);
  }

  .checkbox {
    position: absolute;
    display: none;
  }

  .slider {
    position: absolute;
    width: 100%;
    height: 100%;
    border-radius: 20px;
    -webkit-transition: 0.3s;
    transition: 0.3s;
  }

  .checkbox:checked ~ .slider {
    background-color: var(--light);
  }

  .slider::before {
    content: "";
    position: absolute;
    top: 8px;
    left: 8px; //月亮 10
    width: 20px; //25
    height: 20px;
    border-radius: 50%;
    -webkit-box-shadow: inset 10px -4px 0px 0px var(--light);
    box-shadow: inset 10px -4px 0px 0px var(--light);
    background-color: var(--dark);
    -webkit-transition: 0.3s;
    transition: 0.3s;
  }

  .checkbox:checked + .slider::before {
    -webkit-transform: translateX(24px);
    -ms-transform: translateX(24px);
    transform: translateX(24px); //50
    background-color: var(--dark);
    -webkit-box-shadow: none;
    box-shadow: none;
  }

  ${({ theme }) => theme.media.md} {
    margin-top: 1rem;
  }
`;

export default Switch;
