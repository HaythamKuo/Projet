import styled from "styled-components";

export const HeaderLayout = styled.header`
  background-color: beige;
  display: flex;
  gap: 2rem;
  align-items: center;
  padding: 1rem 1rem;
  border-radius: 12px; // 這裡控制圓角大小
  box-shadow: ${({ theme }) => theme.colors.boxShadow};

  transition: all 0.3s ease;

  // 如果您想要bottom邊緣更圓滑，可以調整下方的border-radius
  border-bottom-left-radius: 20px;
  border-bottom-right-radius: 20px;
`;
