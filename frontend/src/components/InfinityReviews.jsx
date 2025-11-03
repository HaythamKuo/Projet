import styled from "styled-components";
import { motion, useAnimation } from "framer-motion";
import { useEffect } from "react";
import { imgBasicStyle } from "../styles/theme";
import { useFetchGroupsReviewQuery } from "../store/apis/reviewSlice";

const StyledWrapper = styled.div`
  width: 100%;
  overflow: hidden;
  margin-top: 3rem;

  ${({ theme }) => theme.media.md} {
    display: none;
  }
`;

const Slider = styled(motion.div)`
  display: flex;
  /* width: 200%; */
  width: max-content;
  gap: 0.5rem;
`;

const CommentContaner = styled.div`
  display: flex;
  align-items: center;
  gap: 1rem;
  //  width: clamp(200px, 10vw, 500px);
  width: clamp(250px, 20vw, 500px);

  background-color: white;
  //border: 1px solid black;
  border-radius: 8px;
  box-shadow: ${({ theme }) => theme.colors.boxShadow};

  padding: 0.5rem;
`;
const Proflie = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;
const PortraitWrapper = styled.div`
  width: clamp(40px, 8vw, 80px);
  aspect-ratio: 1;
  border-radius: 50%;
  overflow: hidden;
`;
const Img = styled.img`
  ${imgBasicStyle}
`;

const ReviewBox = styled.div`
  flex: 1; /* 填滿剩餘空間 */
  max-width: 500px; /* 限制評論文字區塊寬度 */
  background: #f5f5f5;
  padding: 0.75rem;
  border-radius: 8px;
  overflow-x: auto; /* 超出時橫向捲動 */
`;
const Comment = styled.p`
  margin: 0;
  white-space: nowrap;
`;

const OptionBox = styled.div`
  display: flex;
  gap: 0.5rem;
`;
const EmptyComment = styled.p`
  font-size: 1.5rem;
  margin-top: 3rem;
  color: ${({ theme }) => theme.colors.default};
`;

function repeatItems(items, minRepeat = 2) {
  if (!items || items.length === 0) return [];

  let results = [...items];

  while (results.length < items.length * minRepeat)
    results = results.concat(items);
  return results;
}

function InfinityReviews({ prodId }) {
  const controlls = useAnimation();

  const { data: reviews = [], isLoading: fetching } =
    useFetchGroupsReviewQuery(prodId);

  const hasLengthEnough = reviews?.length >= 3;
  const duplicateReviews = hasLengthEnough ? repeatItems(reviews, 4) : reviews;

  useEffect(() => {
    controlls.start({
      x: "-50%",
      transition: { duration: 15, repeat: Infinity, ease: "linear" },
    });
  }, [controlls]);

  if (fetching) return <p>讀取中</p>;
  if (!reviews || reviews.length === 0)
    return <EmptyComment>目前尚無任何評論喔!</EmptyComment>;

  return (
    <StyledWrapper $direction={hasLengthEnough}>
      {hasLengthEnough ? (
        <Slider
          animate={controlls}
          onMouseEnter={() => controlls.stop()}
          onMouseLeave={() =>
            controlls.start({
              x: "-50%",
              transition: { duration: 15, repeat: Infinity, ease: "linear" },
            })
          }
        >
          {duplicateReviews.map((card, i) => (
            <CommentContaner key={card._id + i}>
              <Proflie>
                <PortraitWrapper>
                  <Img src="/golden-2.jpg" alt="img" />
                </PortraitWrapper>
                <p>{card?.userId?.name}</p>
              </Proflie>
              <ReviewBox>
                <Comment>{card?.comment}</Comment>
              </ReviewBox>
            </CommentContaner>
          ))}
        </Slider>
      ) : (
        <OptionBox>
          {reviews.map((card) => (
            <CommentContaner key={card._id}>
              <Proflie>
                <PortraitWrapper>
                  <Img src="/golden-2.jpg" alt="img" />
                </PortraitWrapper>
                <p>{card?.userId?.name}</p>
              </Proflie>
              <ReviewBox>
                <Comment>{card.comment}</Comment>
              </ReviewBox>
            </CommentContaner>
          ))}
        </OptionBox>
      )}
    </StyledWrapper>
  );
}

export default InfinityReviews;
