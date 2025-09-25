import styled from "styled-components";
import { motion } from "framer-motion";

const ReviewStars = ({ onChange, prodId, rating }) => {
  const handleClick = (value) => {
    if (onChange) onChange(value);
  };

  return (
    <StyledWrapper>
      <div className="rating">
        {[5, 4, 3, 2, 1].map((star) => (
          <StarLabel
            key={star}
            htmlFor={`star${star}${prodId}`}
            whileHover={{ scale: 1.2, color: "#ff9e0b" }}
            whileTap={{ scale: 0.9, color: "#e58e09" }}
            style={{ color: star <= rating ? "#ffa723" : "#666" }}
            onClick={() => handleClick(star)}
          >
            ★
          </StarLabel>
        ))}
        {/* 隱藏 input 保留可存取性 */}
        {[5, 4, 3, 2, 1].map((star) => (
          <input
            key={star}
            type="radio"
            name={`rate${prodId}`}
            id={`star${star}`}
            value={star}
            checked={rating === star}
            onChange={() => handleClick(star)}
            style={{ display: "none" }}
          />
        ))}
      </div>
    </StyledWrapper>
  );
};

const StyledWrapper = styled.div`
  .rating {
    display: flex;
    flex-direction: row-reverse; /* 保持右到左的排列 */
    justify-content: flex-end;
  }
`;

const StarLabel = styled(motion.label)`
  font-size: 2rem;
  cursor: pointer;
  user-select: none;
  transition: color 0.2s;
  margin: 0 2px;
`;

export default ReviewStars;
