import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import { motion } from "framer-motion";
import styled, { css } from "styled-components";
import { FaLocationArrow, FaUser } from "react-icons/fa";
import { SubmitBtn, CancelBtn } from "../styles/ProdImgGallery.style";
import { flexCenter } from "../styles/theme";

const Container = styled.div`
  padding: 1rem 2rem;

  overflow: hidden;

  ${({ theme }) => theme.media.md} {
    padding: 0 1rem;
  }
`;

const Header = styled.div`
  text-align: center;
  margin-bottom: 4rem;
  position: relative;
  z-index: 1;

  ${({ theme }) => theme.media.md} {
    margin-bottom: 3rem;
  }
`;

const Logo = styled.div`
  display: inline-block;

  background: ${({ theme }) => theme.about.backGround};
  padding: 1.5rem 2.5rem;
  border-radius: 50px;
  margin-bottom: 2rem;
  box-shadow: 0 4px 15px rgba(74, 155, 142, 0.15);
`;

const Title = styled.h1`
  color: ${({ theme }) => theme.about.title};
  font-size: 2.5rem;
  font-weight: 700;

  /* @media (max-width: 768px) {
    font-size: 1.8rem;
  } */

  ${({ theme }) => theme.media.md} {
    font-size: 1.8rem;
  }
`;

const Subtitle = styled.p`
  color: ${({ theme }) => theme.about.subtitle};
  max-width: 600px;
  margin: 0 auto;
  line-height: 1.8;
  font-size: 1.25rem;
  font-weight: bold;
`;

const Grid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(320px, 1fr));
  gap: 3rem;
  margin-bottom: 4rem;
  position: relative;
  z-index: 1;

  ${({ theme }) => theme.media.md} {
    grid-template-columns: 1fr;
    gap: 2rem;
  }
`;

const Card = styled.div`
  background: ${({ theme }) => theme.about.backGround};
  border-radius: 30px;
  overflow: visible;
  box-shadow: 0 8px 25px rgba(0, 0, 0, 0.08);
  transition: transform 0.3s ease, box-shadow 0.3s ease;
  position: relative;

  &:hover {
    transform: translateY(-8px);
    box-shadow: 0 12px 35px rgba(74, 155, 142, 0.15);
  }
`;

const CardImageWrapper = styled.div`
  position: relative;
  padding: 1.5rem 1.5rem 0;
`;

const OrganicShape = styled.div`
  position: absolute;
  width: 100%;
  height: 250px;
  background: #f9d882;
  border-radius: 40% 60% 60% 40% / 60% 40% 60% 40%;
  top: 0;
  left: 0;
  z-index: 0;
  opacity: 0.3;

  ${({ theme }) => theme.media.md} {
    height: 200px;
  }
`;

const CardImage = styled.img`
  width: 100%;
  height: 280px;
  object-fit: cover;
  border-radius: 50%;
  position: relative;
  z-index: 1;
  border: 6px solid white;
  box-shadow: 0 6px 20px rgba(0, 0, 0, 0.1);

  ${({ theme }) => theme.media.md} {
    height: 240px;
  }
`;

const CardContent = styled.div`
  padding: 2rem 1.5rem;
  text-align: center;
`;

const CardTitle = styled.h3`
  color: ${({ theme }) => theme.about.title};
  margin-bottom: 0.8rem;
  font-size: 1.3rem;
  font-weight: bolder;
`;

const CardText = styled.p`
  color: ${({ theme }) => theme.about.text};
  line-height: 1.7;
  font-size: 0.95rem;
`;

const Footer = styled.footer`
  text-align: center;

  background: ${({ theme }) => theme.about.backGround};
  border-radius: 30px;
  padding: 2.5rem;
  box-shadow: 0 8px 25px rgba(0, 0, 0, 0.08);
  position: relative;
  z-index: 1;

  ${({ theme }) => theme.media.md} {
    padding: 2rem 1.5rem;
  }
`;

const FooterTitle = styled.h2`
  color: ${({ theme }) => theme.about.title};
  margin-bottom: 1.2rem;
  font-size: 1.8rem;
  font-weight: 600;
`;

const FooterText = styled.p`
  color: ${({ theme }) => theme.about.subtitle};

  max-width: 700px;
  margin: 0 auto;
  line-height: 1.8;
  font-size: 1.05rem;
`;

const BtnBox = styled.div`
  ${flexCenter}
  gap:1rem;
  margin-top: 10px;
  ${({ theme }) => theme.media.md} {
    flex-direction: column;
  }
`;

const refactBtnProperty = css`
  display: flex;
  align-items: center;
  gap: 8px; /* 設定圖示與文字的間距 */
  overflow: hidden; /* 確保圖示從邊界外滑入時不會溢出 */
`;

const GotoShop = styled(motion(SubmitBtn))`
  ${refactBtnProperty}
`;

const GotoLogin = styled(motion(CancelBtn))`
  ${refactBtnProperty}
  pointer-events: ${({ $disabled }) => ($disabled ? "none" : "initial")};
`;

// 建立一個 motion 容器給 Icon
const IconWrapper = styled(motion.span)`
  ${flexCenter}
`;

const SpanTxt = styled.span``;

const iconVariants = {
  initial: {
    opacity: 0,
    x: -15, // 從左邊一點點的位置開始
    scale: 0.5,
  },
  hover: {
    opacity: 1,
    x: 0,
    scale: 1,
    transition: {
      duration: 0.3,
      ease: "easeOut",
    },
  },
};

const textVariants = {
  initial: { x: -10 }, // 初始稍微偏左（如果圖示預設不佔位）
  hover: {
    x: 0,
    transition: { duration: 0.3 },
  },
};

function AboutUs() {
  const { userInfo } = useSelector((state) => state.auth);

  return (
    <Container>
      <Header>
        <Logo>
          <Title>毛茸茸溫暖世界</Title>
        </Logo>
        <Subtitle>
          我們專注於為每個人提供溫暖與陪伴，無論是獨自一人、情侶相伴，還是家庭共享，毛茸茸的娃娃總能帶來幸福的溫度。
        </Subtitle>
      </Header>

      <Grid>
        <Card>
          <CardImageWrapper>
            <OrganicShape />
            {/* <CardImage src='' alt='圖片' /> */}
            <CardImage src="/cat-1.jpg" alt="圖片" />
          </CardImageWrapper>
          <CardContent>
            <CardTitle>單人陪伴</CardTitle>
            <CardText>
              為獨自生活的您提供溫暖陪伴，讓每個夜晚都有柔軟的擁抱。
            </CardText>
          </CardContent>
        </Card>
        <Card>
          <CardImageWrapper>
            <OrganicShape />
            {/* <CardImage src='' alt='圖片' /> */}
            <CardImage src="/cat-1.jpg" alt="圖片" />
          </CardImageWrapper>
          <CardContent>
            <CardTitle>情侶甜蜜</CardTitle>
            <CardText>
              成雙成對的娃娃，見證愛情的美好時刻，傳遞溫柔情意。
            </CardText>
          </CardContent>
        </Card>
        <Card>
          <CardImageWrapper>
            <OrganicShape />
            {/* <CardImage src='' alt='圖片' /> */}
            <CardImage src="/cat-1.jpg" alt="圖片" />
          </CardImageWrapper>
          <CardContent>
            <CardTitle>家庭溫暖</CardTitle>
            <CardText>
              全家人的快樂泉源，為孩子帶來歡笑，為家庭增添溫馨氛圍。
            </CardText>
          </CardContent>
        </Card>
      </Grid>

      <Footer>
        <FooterTitle>我們的使命</FooterTitle>
        <FooterText>
          每一隻娃娃都承載著我們的用心與愛，精心挑選最柔軟的材質，注入滿滿的溫度。我們相信，毛茸茸的陪伴能夠療癒心靈，帶來溫暖與幸福。
        </FooterText>

        <BtnBox>
          <Link to="/products">
            <GotoShop initial="initial" whileHover="hover">
              <IconWrapper variants={iconVariants}>
                <FaLocationArrow />
              </IconWrapper>
              <motion.span variants={textVariants}>
                <SpanTxt>前去購物</SpanTxt>
              </motion.span>
            </GotoShop>
          </Link>

          <Link to="/auth">
            <GotoLogin
              initial="initial"
              whileHover="hover"
              $disabled={userInfo}
            >
              <IconWrapper variants={iconVariants}>
                <FaUser />
              </IconWrapper>
              <motion.span variants={textVariants}>
                <SpanTxt>前去登入</SpanTxt>
              </motion.span>
            </GotoLogin>
          </Link>
        </BtnBox>
      </Footer>
    </Container>
  );
}
export default AboutUs;
