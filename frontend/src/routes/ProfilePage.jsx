import { useState, useEffect } from "react";

import { toast } from "react-toastify";
import {
  useLocation,
  useNavigate,
  Link,
  useSearchParams,
} from "react-router-dom";

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
  OrderLink,
} from "../styles/profile.style";
import ProcessLoader from "../styles/UI/ProcessLoader";

import UploadProdList from "../components/UploadProdList";
import Collections from "../components/Collections";
import BindAcc from "../components/BindAcc";
import Breadcrumb from "../styles/UI/Breadcrumb";

function Profile() {
  // const [type, setType] = useState("created");
  const [handleToast, setHandleToast] = useState(false);

  const location = useLocation();
  const navigate = useNavigate();
  const { data, isLoading, isError, error } = useGetProfileQuery();

  //根據query string來切換component
  const [searchParams, setSearchparams] = useSearchParams();
  const currentTab = searchParams.get("tab") || "created";

  function handleQueryStr(tab) {
    setSearchparams({ tab });
  }

  useEffect(() => {
    const params = new URLSearchParams(location.search);

    if (params.get("bind") === "success" && !handleToast) {
      //待修正
      navigate("/profile", { replace: true });
      toast.success("✅ Google 綁定成功！");
      setHandleToast(true);

      searchParams({ tab: "third-party" });
    }
  }, [location, navigate, handleToast, searchParams]);

  useEffect(() => {
    if (!searchParams.get("tab")) {
      setSearchparams({ tab: "created" }, { replace: true });
    }
  }, [searchParams, setSearchparams]);

  let profile;
  if (isLoading) {
    profile = <ProcessLoader />;
  } else if (isError) {
    profile = error;
  } else {
    profile = data;
  }

  let content;
  if (currentTab === "created") {
    content = <UploadProdList />;
  } else if (currentTab === "saved") {
    content = <Collections userId={data?._id} />;
  } else if (currentTab === "third-party") {
    content = <BindAcc googleId={data?.googleId} lineId={data?.lineId} />;
  }

  return (
    <>
      <Breadcrumb />
      <ProfileContainer>
        <ImgWrapper>
          <UserPhoto src="/golden-2.jpg" />
        </ImgWrapper>
        {/* <UserName>John</UserName> */}
        <UserName>{profile.name}</UserName>
        {/* <UserMail>這邊放email</UserMail> */}
        <UserMail>{profile.email}</UserMail>
        <UserInteractionBox>
          <Link to="create-product">
            <InfoUpload />
          </Link>

          <ProfileBtns>
            <OrderLink to="orders">訂單內容</OrderLink>
          </ProfileBtns>
          <InfoDelete />
        </UserInteractionBox>
        <ProfileOptions>
          <ProfileOption
            // active={type === "created"}
            // onClick={() => setType("created")}
            active={currentTab === "created"}
            onClick={() => handleQueryStr("created")}
          >
            您的產品
          </ProfileOption>
          <ProfileOption
            // active={type === "saved"}
            // onClick={() => setType("saved")}

            active={currentTab === "saved"}
            onClick={() => handleQueryStr("saved")}
          >
            收藏清單
          </ProfileOption>
          <ProfileOption
            // active={type === "third-party"}
            // onClick={() => setType("third-party")}
            active={currentTab === "third-party"}
            onClick={() => handleQueryStr("third-party")}
          >
            綁定選項
          </ProfileOption>
        </ProfileOptions>
        {content}
      </ProfileContainer>
    </>
  );
}
export default Profile;
