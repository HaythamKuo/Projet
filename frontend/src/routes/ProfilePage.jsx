import { useState } from "react";
import { Link } from "react-router-dom";

import { useGetProfileQuery } from "../store/apis/apiSlice";
import {
  ProfileOptions,
  ProfileContainer,
  UserInteractionBox,
  ProfileBtns,
  ImgWrapper,
  UserPhoto,
  UserMail,
  UserName,
  InfoUpload,
  InfoDelete,
  ProfileOption,
} from "../styles/profile.style";
import ProcessLoader from "../styles/UI/ProcessLoader";

import UploadProdList from "../components/UploadProdList";
import Collections from "../components/Collections";

function Profile() {
  const [type, setType] = useState("created");

  const { data, isLoading, isError, error } = useGetProfileQuery();

  let profile;
  if (isLoading) {
    profile = <ProcessLoader />;
  } else if (isError) {
    profile = error;
  } else {
    profile = data;
  }

  return (
    <>
      <ProfileContainer>
        <ImgWrapper>
          <UserPhoto src="/golden-2.jpg" />
        </ImgWrapper>
        <UserName>John</UserName>
        {profile.name}
        <UserMail>這邊放email</UserMail>
        {profile.email}
        <UserInteractionBox>
          <Link to="/create-product">
            <InfoUpload />
          </Link>
          <ProfileBtns>
            <button>訊息</button>
            <button>隨便一個</button>
          </ProfileBtns>
          <InfoDelete />
        </UserInteractionBox>
        <ProfileOptions>
          <ProfileOption
            active={type === "created"}
            onClick={() => setType("created")}
          >
            created
          </ProfileOption>
          <ProfileOption
            active={type === "saved"}
            onClick={() => setType("saved")}
          >
            saved
          </ProfileOption>
        </ProfileOptions>
        {type === "created" ? <UploadProdList /> : <Collections />}
      </ProfileContainer>
    </>
  );
}
export default Profile;
