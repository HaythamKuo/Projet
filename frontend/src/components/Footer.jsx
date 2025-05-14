import {
  FooterContainer,
  IconContainer,
  SocialContainer,
  SocialDes,
  IconWrapper,
  CopyRightContainer,
  CopyRight,
} from "../styles/Footer.style";
import { FaMailchimp, FaInstagram, FaFacebook } from "react-icons/fa";

function Footer() {
  const socialMedias = [
    { icon: FaFacebook, label: "Facebook" },
    { icon: FaInstagram, label: "Instagram" },
    {
      icon: FaMailchimp,
      label: "Email",
    },
  ];

  function socialLoop() {
    return socialMedias.map(({ icon, label }) => (
      <SocialContainer key={label}>
        <IconWrapper as={icon} />
        <SocialDes>{label}</SocialDes>
      </SocialContainer>
    ));
  }

  return (
    <>
      <FooterContainer>
        <div className="logoSection">
          <h1>DollSoilder</h1>
          <section>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Commodi
            cumque mollitia aspernatur necessitatibus earum perspiciatis, minima
            vel iure obcaecati, impedit consequuntur, enim nobis. Fugiat
            consequatur ipsa itaque quae maiores aut!
          </section>
        </div>
        <div className="linkSection">
          <div className="linksSection">
            <h1>about</h1>
            <ul>
              <li>關於我們</li>
              <li>品牌理念</li>
              <li>未來展望</li>
            </ul>
          </div>

          <div className="linksSection">
            <h1>相關問題</h1>
            <ul>
              <li>如何購買</li>
              <li>聯絡客服</li>
              <li>殺時間</li>
            </ul>
          </div>

          <div className="linksSection">
            <h1>追蹤我們</h1>
            <IconContainer>{socialLoop()}</IconContainer>
          </div>
        </div>
      </FooterContainer>
    </>
  );
}
export default Footer;
