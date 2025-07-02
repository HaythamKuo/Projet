import styled from "styled-components";

import { MdDeleteForever, MdUpload } from "react-icons/md";

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
  display: block;
  width: 100%;
  height: 100%;
  border-radius: 50%;
  object-fit: cover;
`;

export const UserName = styled.h1`
  font-size: 2rem;
  font-weight: 500;
`;
export const UserMail = styled.span`
  font-weight: 300;
  color: gray;
`;

export const UserInteractionBox = styled.div`
  display: flex;
  align-items: center;
  gap: 1.75rem;
`;
export const ProfileBtns = styled.div`
  display: flex;
  gap: 1rem;
`;

export const InfoUpload = styled(MdUpload)`
  font-size: 1.5rem;
  cursor: pointer;
  color: black;
`;
export const InfoDelete = styled(MdDeleteForever)`
  font-size: 1.5rem;
  cursor: pointer;
`;

export const ProfileOptions = styled.div`
  display: flex;
  gap: 1rem;
  margin-top: 1.75rem;
  margin-bottom: 1rem;
`;
export const ProfileOption = styled.span`
  cursor: pointer;
  padding: 8px 0;
  font-weight: 500;
  border-bottom: ${({ active }) => (active ? "3px solid black" : "none")};

  //bug
  :hover {
    color: red;
  }
`;
