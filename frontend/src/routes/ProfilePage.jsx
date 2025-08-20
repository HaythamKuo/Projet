import { useState, useEffect } from "react";

import { toast } from "react-toastify";
import { useLocation, useNavigate, Link } from "react-router-dom";

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
import BindAcc from "../components/BindAcc";

function Profile() {
  const [type, setType] = useState("created");

  const location = useLocation();
  const navigate = useNavigate();
  const { data, isLoading, isError, error } = useGetProfileQuery();

  useEffect(() => {
    const params = new URLSearchParams(location.search);

    if (params.get("bind") === "success") {
      setType("third-party");

      toast.success("✅ Google 綁定成功！");

      // 清掉 query，避免重複觸發
      navigate("/profile", { replace: true });
    }
  }, [location, navigate]);

  let content;
  if (type === "created") {
    content = <UploadProdList />;
  } else if (type === "saved") {
    content = <Collections />;
  } else if (type === "third-party") {
    content = <BindAcc googleId={data?.googleId} />;
  }

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
          <ProfileOption
            active={type === "third-party"}
            onClick={() => setType("third-party")}
          >
            綁定
          </ProfileOption>
        </ProfileOptions>
        {content}
      </ProfileContainer>
    </>
  );
}
export default Profile;
