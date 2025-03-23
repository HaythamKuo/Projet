import styled from "styled-components";

export const HeaderLayout = styled.header`
  background-color: beige;
  display: flex;
  //justify-content: space-between;
  align-items: center;
  padding: 1rem 2rem;
  border-radius: 12px; // 這裡控制圓角大小
  //  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1); // 添加陰影效果增強立體感
  box-shadow: ${({ theme }) => theme.colors.boxShadow};

  transition: all 0.3s ease;

  // 如果您想要bottom邊緣更圓滑，可以調整下方的border-radius
  border-bottom-left-radius: 20px;
  border-bottom-right-radius: 20px;
`;
