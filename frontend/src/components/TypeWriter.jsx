import { useState, useEffect } from "react";
import styled from "styled-components";

export const TypeWriterContainer = styled.div`
  display: flex;
  flex-direction: column;

  flex: 2;

  // RWD
  ${({ theme }) => theme.media.md} {
    flex-direction: row;
    align-items: center;
    gap: 1.5rem;
  }

  span {
    color: ${({ theme }) => theme.colors.default};
    font-size: 3.5rem;

    //RWD to "I am"
  }
`;

const MinorContainer = styled.span`
  display: inline-block;
  position: relative;
`;

const TypeWriterText = styled.h1`
  display: inline-block;
  color: ${({ theme }) => theme.colors.typeWriter};
  font-size: 5rem;

  //RWD to typing worlds
  ${({ theme }) => theme.media.xxl} {
    font-size: 3.5rem;
  }

  ${({ theme }) => theme.media.xl} {
    font-size: 3rem;
  }

  ${({ theme }) => theme.media.lg} {
    font-size: 2.5rem;
  }

  ${({ theme }) => theme.media.md} {
    font-size: 4rem;
  }
`;

const Cursor = styled.span`
  display: inline-block;
  width: 2px;
  height: 3rem;

  //RWD to cursor

  ${({ theme }) => theme.media.xl} {
    height: 1.5rem;
  }

  ${({ theme }) => theme.media.md} {
    height: 2.5rem;
  }

  background-color: ${({ theme }) => theme.colors.cursor};
  margin-left: 5px;
  animation: blink 0.7s infinite;

  @keyframes blink {
    0%,
    100% {
      opacity: 1;
    }
    50% {
      opacity: 0;
    }
  }
`;

const TypeWriter = ({
  phrases,
  typingSpeed = 100,
  deletingSpeed = 50,
  delayAfterPhrase = 1500,
  delayBeforeDelete = 1000,
  showCursor = true,
}) => {
  const [displayText, setDisplayText] = useState("");
  const [phraseIndex, setPhraseIndex] = useState(0);
  const [isTyping, setIsTyping] = useState(true);
  const [isDelaying, setIsDelaying] = useState(false);

  useEffect(() => {
    let timer;

    if (isDelaying) {
      // 句子完全顯示或刪除後的延遲
      const delay = isTyping ? delayAfterPhrase : delayBeforeDelete;
      timer = setTimeout(() => {
        setIsDelaying(false);
        setIsTyping(!isTyping); // 切換到相反的狀態
      }, delay);
    } else if (isTyping) {
      // 正在輸入文字
      const currentPhrase = phrases[phraseIndex];

      if (displayText.length < currentPhrase.length) {
        // 繼續添加字符
        timer = setTimeout(() => {
          setDisplayText(currentPhrase.substring(0, displayText.length + 1));
        }, typingSpeed);
      } else {
        // 完成當前句子的輸入
        setIsDelaying(true);
      }
    } else {
      // 正在刪除文字
      if (displayText.length > 0) {
        // 繼續刪除字符
        timer = setTimeout(() => {
          setDisplayText(displayText.substring(0, displayText.length - 1));
        }, deletingSpeed);
      } else {
        // 準備輸入下一個句子
        setPhraseIndex((prevIndex) => (prevIndex + 1) % phrases.length);
        setIsTyping(true);
      }
    }

    return () => clearTimeout(timer);
  }, [
    displayText,
    phraseIndex,
    isTyping,
    isDelaying,
    phrases,
    typingSpeed,
    deletingSpeed,
    delayAfterPhrase,
    delayBeforeDelete,
  ]);

  return (
    <MinorContainer>
      <TypeWriterText>{displayText}</TypeWriterText>
      {showCursor && <Cursor />}
    </MinorContainer>
  );
};

export default TypeWriter;
