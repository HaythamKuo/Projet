import styled from "styled-components";
import { motion, AnimatePresence } from "framer-motion";
import { Arrow } from "./SelectOption";
import { useState, useRef } from "react";
import { Link } from "react-router-dom";
import useClickOutside from "../hooks/useClickOutside";

//特效
const listVariants = {
  hidden: {
    opacity: 0,
    height: 0,
    transition: { when: "afterChildren" },
  },
  show: {
    opacity: 1,
    height: "auto",
    transition: {
      when: "beforeChildren",
      staggerChildren: 0.08,
      duration: 0.3,
      ease: "easeOut",
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: -10 },
  show: { opacity: 1, y: 0 },
};
////

const MemberContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const Box = styled(motion.div)`
  display: flex;
  gap: 0.5rem;
  align-items: center;
`;

const MinorTitle = styled.h3`
  font-size: clamp(1rem, 0.8rem + 0.5vw, 1.25rem);
  color: ${({ theme }) => theme.colors.default};
`;

const PointerArrow = styled(Arrow)`
  font-size: 1.35rem;
`;

const MemberList = styled(motion.div)`
  display: flex;
  flex-direction: column;
  align-items: center;
  overflow: hidden;
  padding: 1rem 0;
  gap: 1rem;
`;

const MemberBtn = styled.button`
  color: ${({ theme }) => theme.colors.default};
  text-decoration: none;

  font-size: clamp(1rem, 0.8rem + 0.5vw, 1.25rem);
  border: none;
  background: none;
  font-weight: 600;
`;

function SideMember() {
  const controllMemberRef = useRef(null);
  const [extend, setExtend] = useState(false);

  useClickOutside(controllMemberRef, () => setExtend(false));

  return (
    <MemberContainer>
      <Box onClick={() => setExtend((pre) => !pre)}>
        <MinorTitle>會員中心</MinorTitle>
        <PointerArrow $rottate={extend} />
      </Box>

      <AnimatePresence>
        {extend && (
          <MemberList
            key="memberList"
            variants={listVariants}
            initial="hidden"
            exit="hidden"
            animate="show"
            ref={controllMemberRef}
          >
            <motion.div variants={itemVariants}>
              <MemberBtn
                as={Link}
                to="profile"
                onClick={() => setExtend(false)}
              >
                我的帳戶
              </MemberBtn>
            </motion.div>
            <motion.div variants={itemVariants}>
              <MemberBtn
                as={Link}
                to="profile/?tab=saved"
                onClick={() => setExtend(false)}
              >
                我的清單
              </MemberBtn>
            </motion.div>
            <motion.div variants={itemVariants}>
              <MemberBtn
                as={Link}
                to="profile/orders"
                onClick={() => setExtend(false)}
              >
                我的訂單
              </MemberBtn>
            </motion.div>
          </MemberList>
        )}
      </AnimatePresence>
    </MemberContainer>
  );
}
export default SideMember;
