import styled from "styled-components";
import { FaStar, FaStarHalfAlt, FaRegStar } from "react-icons/fa";

const RatingWrapper = styled.div`
  display: flex;
  align-items: center;
`;

const IconStyle = `
    width:1rem;
    height:1rem;
    margin-right: 0.125rem;   
`;

const Full = styled(FaStar)`
  color: #f5a623;
  ${IconStyle}
`;
const Half = styled(FaStarHalfAlt)`
  color: #f5a623;
  ${IconStyle}
`;
const Empty = styled(FaRegStar)`
  color: #d8d8d8;
  ${IconStyle}
`;

const RatingText = styled.span`
  font-size: 1rem;
  color: #555;
  color: ${({ theme }) => theme.spotLight.rating};
  margin-left: 0.25rem;
  margin-top: 3.25px;
`;

function StarRating({ rating = 0, max = 5, showText = true }) {
  const stars = [];
  for (let i = 1; i <= max; i++) {
    if (rating >= i) {
      stars.push(<Full key={i} aria-hidden="true" />);
    } else if (rating >= i - 0.5) {
      stars.push(<Half key={i} aria-hidden="true" />);
    } else {
      stars.push(<Empty key={i} aria-hidden="true" />);
    }
  }

  return (
    <RatingWrapper aria-label={`評分: ${rating}顆星 滿分為${max}`}>
      {stars}
      {showText && <RatingText>{rating.toFixed(1)}</RatingText>}
    </RatingWrapper>
  );
}
export default StarRating;
