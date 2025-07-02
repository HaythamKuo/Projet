import { useState } from "react";
import { Link } from "react-router-dom";
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
import UploadProdList from "../components/UploadProdList";
import Collections from "../components/Collections";

function Profile() {
  const [type, setType] = useState("created");

  return (
    <>
      <ProfileContainer>
        <ImgWrapper>
          <UserPhoto src="/golden-2.jpg" />
        </ImgWrapper>
        <UserName>John</UserName>
        <UserMail>這邊放email</UserMail>

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
