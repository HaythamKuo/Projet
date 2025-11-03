import styled from "styled-components";
import { MdOutlineKeyboardArrowLeft } from "react-icons/md";

export const BreadcrumbContainer = styled.div`
  ul {
    display: flex;
    gap: 1.5rem;
  }
`;

export const BreadLeftArrow = styled(MdOutlineKeyboardArrowLeft)`
  color: ${({ theme }) => theme.colors.default};
`;

export const BreadRightArrow = styled(BreadLeftArrow)`
  transform: rotate(0.5turn);
  color: ${({ theme }) => theme.colors.default};
`;

export const Left = styled.div`
  display: flex;
  align-items: center;
  gap: 3px;
`;

export const Right = styled.div`
  display: flex;
  align-items: center;
  gap: 3px;

  a:last-child {
    color: ${({ theme }) => theme.colors.default};
    font-weight: bolder;
    pointer-events: none;
  }

  ${({ theme }) => theme.media.md} {
    display: none;
  }
`;

export const Direct = styled.span`
  color: ${({ theme }) => theme.button.direct};
  cursor: pointer;
  font-size: 1.25rem;
  font-weight: bold;

  ${({ theme }) => theme.media.lg} {
    font-size: 1rem;
  }
`;

export const Division = styled.div`
  background-color: gray;
  padding: 1px;
  margin: 5px;
  ${({ theme }) => theme.media.md} {
    display: none;
  }
`;
