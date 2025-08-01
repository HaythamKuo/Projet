import styled from "styled-components";
import { FaRegBookmark, FaCartShopping } from "react-icons/fa6";

export const CardsContainer = styled.section`
  //max-width: 1200px;
  margin: 0 auto;

  //display: flex;
`;

export const Heading = styled.h1`
  font-size: 24px;
  font-weight: bold;
  text-align: center;
  margin-bottom: 1rem;
`;

export const Cards = styled.ul`
  display: flex;
  flex-wrap: wrap;

  margin: 0;
  padding: 0;
`;

export const CardItem = styled.li`
  display: flex;
  padding: 0.5rem;

  flex: 0 0 25%;

  /* ${({ theme }) => theme.media.xxl} {
    flex: 0 0 25%; // 4 張
  } */

  ${({ theme }) => theme.media.xxl} {
    flex: 0 0 33.3333%; // 3 張
  }

  ${({ theme }) => theme.media.xl} {
    flex: 0 0 33.3333%; // 3 張
  }

  ${({ theme }) => theme.media.lg} {
    flex: 0 0 50%; // 2 張
  }

  ${({ theme }) => theme.media.md} {
    flex: 0 0 100%; // 1 張
  }
`;

export const Card = styled.div`
  border-radius: 12px;
  box-shadow: 0 20px 40px -14px rgba(0, 0, 0, 0.25);
  display: flex;
  flex-direction: column;
  overflow: hidden;
  width: 100%;
`;

export const ImageWrapper = styled.div`
  /* width: 100%;

  //test
  flex: 0 0 auto; */

  position: relative;
  width: 100%;
  //padding-top: 75%; // 4:3 比例（可改為 56.25% 表示 16:9）
  padding-top: 75%;
  overflow: hidden;
`;

export const TestImg = styled.img`
  /* width: 100%;
  height: 100%;
  display: block;
  object-fit: cover; */

  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  display: block;
  object-fit: cover;
`;

export const CardContent = styled.div`
  padding: 1rem;
  //background: linear-gradient(to bottom left, #ef8d9c 40%, #ffc39e 100%);
  background-color: ${({ theme }) => theme.card.backGround};
  display: flex;
  flex-direction: column;
  flex-grow: 1;
`;

export const CardTitle = styled.h2`
  margin: 0;
  font-size: 2rem;
  font-weight: bold;
  letter-spacing: 1px;
  text-transform: capitalize;
  color: ${({ theme }) => theme.colors.default};
`;

export const CardText = styled.p`
  //flex-grow: 1;
  margin: 1rem 0 1.25rem;
  font-size: 1.5rem;
  line-height: 1.5%;
  color: ${({ theme }) => theme.colors.default};
`;

export const TextRatingBox = styled.div`
  display: flex;
  align-items: baseline;
  justify-content: space-between;
`;

export const InfoCartMarkBox = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 1rem;

  ${({ theme }) => theme.media.xxl} {
    flex-direction: column;
  }
`;

export const Button = styled.button.attrs((prop) => ({
  type: prop.type || "button",
}))`
  background-color: ${({ theme }) => theme.spotLight.color};
  border: 1px solid rgba(255, 255, 255, 0.2);
  border-radius: 4px;
  padding: 0.8rem;
  font-size: 14px;
  font-weight: bold;
  text-transform: uppercase;
  color: ${({ theme }) => theme.card.backGround};
  cursor: pointer;
  width: 100%;
  //flex-grow: 2;

  transition: transform 0.3s ease, box-shadow 0.2s ease;

  &:hover {
    /* 向上移動 2px，可依需求調整距離 */
    transform: translateY(-3px);
    /* 如果想要加點陰影效果，可以同時加上 box-shadow */
    box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  }
`;

export const CartMarkBox = styled.div`
  display: flex;
  align-items: center;
`;

export const Cart = styled(FaCartShopping)`
  font-size: 2.5rem;
  cursor: pointer;
  margin-left: 2rem;
`;
export const BookMark = styled(FaRegBookmark)`
  font-size: 2rem;
  cursor: pointer;
`;
