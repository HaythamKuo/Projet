import styled from "styled-components";
import { FaRegCopyright } from "react-icons/fa";

export const FooterContainer = styled.footer`
  width: 100%;
  display: flex;
  justify-content: space-between;
  color: ${({ theme }) => theme.spotLight.color};

  h1 {
    font-size: 1.5rem;
    font-weight: bold;
  }

  .logoSection {
    //flex: 1;
    flex-direction: column;
    width: 30%;
  }

  .linkSection {
    //flex: 2;
    display: flex;
    justify-content: space-between;
    width: 65%;
  }

  .linksSection {
    display: flex;
    flex-direction: column;

    li {
      padding: 0.5rem 0;
    }
  }
`;

// social media links
export const IconContainer = styled.ul``;

export const SocialContainer = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;
  cursor: pointer;
  margin: 10px 0;
`;
export const SocialDes = styled.span`
  font-size: 1rem;
`;
export const IconWrapper = styled.div`
  font-size: ${({ size }) => size || "1.5rem"};
`;

//copyright
export const CopyRightContainer = styled.div`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  margin-top: 0.5rem;
  color: ${({ theme }) => theme.spotLight.color};

  span {
    font-size: 1.25rem;
  }

  ${({ theme }) => theme.media.md} {
    justify-content: center;
  }
`;
export const CopyRight = styled(FaRegCopyright)`
  font-size: 1.25rem;
`;
