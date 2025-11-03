import styled, { css } from "styled-components";

import { MdDeleteForever, MdUpload } from "react-icons/md";
import { Link } from "react-router-dom";
import { imgBasicStyle } from "./theme";

//針對ProfileOptions and UserInteractionBox 所做的rwd重構
const refactorRwd = css`
  ${({ theme }) => theme.media.lg} {
    width: 100%;
    justify-content: space-around;
  }
  ${({ theme }) => theme.media.md} {
    width: 100%;
    justify-content: space-between;
  }
`;

export const ProfileContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;

  gap: 1rem;
`;

export const ImgWrapper = styled.div`
  height: 100px;
  width: 100px;
`;
export const UserPhoto = styled.img`
  ${imgBasicStyle}
  /* display: block;
  width: 100%;
  height: 100%;
  object-fit: cover; */
  border-radius: 50%;
`;

export const UserName = styled.h1`
  font-size: 2rem;
  font-weight: 500;
  color: ${({ theme }) => theme.colors.default};
`;
export const UserMail = styled.span`
  font-weight: 300;
  color: ${({ theme }) => theme.button.direct};
`;

export const UserInteractionBox = styled.div`
  display: flex;
  align-items: center;

  gap: 1.75rem;

  ${refactorRwd}
`;
export const ProfileBtns = styled.div`
  display: flex;
  gap: 1rem;
`;

export const InfoUpload = styled(MdUpload)`
  font-size: 1.5rem;
  cursor: pointer;
  color: ${({ theme }) => theme.colors.default};
`;
export const InfoDelete = styled(MdDeleteForever)`
  font-size: 1.5rem;
  cursor: pointer;
  color: ${({ theme }) => theme.colors.default};
`;

export const ProfileOptions = styled.div`
  display: flex;
  gap: 1rem;

  margin: 1.75rem 0 1rem 0;
  color: ${({ theme }) => theme.colors.default};
  ${refactorRwd}
`;
export const ProfileOption = styled.span`
  cursor: pointer;
  padding: 8px 0;
  font-weight: 500;
  border-bottom: ${({ active, theme }) =>
    active ? `3px solid ${theme.colors.default}` : "none"};
`;

export const OrderLink = styled(Link)`
  font-size: 1rem;
  color: ${({ theme }) => theme.colors.default};
  background-color: ${({ theme }) => theme.spotLight.spotColor};
  padding: 0.5rem;
  //border: 1px solid black;
  border-radius: 8px;
  &:hover {
  }
`;
