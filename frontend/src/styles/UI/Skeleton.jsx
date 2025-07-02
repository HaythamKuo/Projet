import styled, { keyframes } from "styled-components";

// shimmer 動畫
const shimmer = keyframes`
  100% {
    transform: translateX(100%);
  }
`;

// Shimmer 背景條
const Shimmer = styled.div`
  position: absolute;
  inset: 0;
  transform: translateX(-100%);
  background-image: linear-gradient(
    to right,
    #e5e7eb 0%,
    #ffffff 50%,
    #e5e7eb 100%
  );
  animation: ${shimmer} 1.5s infinite;
`;

// 基本骨架條
const SkeletonWrapper = styled.div`
  position: relative;
  overflow: hidden;
  background-color: #e5e7eb;
  border-radius: ${(props) => props.radius || "6px"};
  width: 100%;
  height: ${(props) => props.height};
  margin-bottom: ${(props) => props.$marginBottom || "10px"};
`;

// 卡片容器（仿 Cards）
export const SkeletonCards = styled.ul`
  display: flex;
  flex-wrap: wrap;
  margin: 0;
  padding: 0;
`;

// 單一卡片項目（仿 CardItem）
export const SkeletonCardItem = styled.li`
  display: flex;
  padding: 0.5rem;
  flex: 0 0 25%;

  ${({ theme }) => theme?.media?.xl} {
    flex: 0 0 33.3333%;
  }

  ${({ theme }) => theme?.media?.lg} {
    flex: 0 0 50%;
  }

  ${({ theme }) => theme?.media?.md} {
    flex: 0 0 100%;
  }
`;

// 骨架卡片本體（仿 Card）
export const SkeletonCard = styled.div`
  border-radius: 12px;
  box-shadow: 0 20px 40px -14px rgba(0, 0, 0, 0.1);
  display: flex;
  flex-direction: column;
  overflow: hidden;
  width: 100%;
`;

// Skeleton 卡片元件
function Skeleton({ marginBottom }) {
  return (
    <SkeletonCard>
      <SkeletonWrapper $marginBottom={marginBottom} height="200px">
        <Shimmer />
      </SkeletonWrapper>
      <div style={{ padding: "1rem", flexGrow: 1 }}>
        <SkeletonWrapper height="24px" radius="4px" $marginBottom="12px">
          <Shimmer />
        </SkeletonWrapper>
        <SkeletonWrapper height="16px" radius="4px" $marginBottom="10px">
          <Shimmer />
        </SkeletonWrapper>
        <SkeletonWrapper height="40px" radius="6px">
          <Shimmer />
        </SkeletonWrapper>
      </div>
    </SkeletonCard>
  );
}

export default Skeleton;
