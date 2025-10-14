import styled from "styled-components";

export const HeaderLayout = styled.header`
  background-color: ${({ theme }) => theme.colors.convertBeige};
  display: flex;

  justify-content: space-evenly;
  gap: 2rem;
  align-items: center;
  padding: 1rem 1rem;
  border-radius: 12px; // 這裡控制圓角大小
  box-shadow: ${({ theme }) => theme.colors.boxShadow};

  transition: all 0.3s ease;

  border-bottom-left-radius: 20px;
  border-bottom-right-radius: 20px;

  //RWD
  ${({ theme }) => theme.media.md} {
    flex-direction: column;
  }
`;
