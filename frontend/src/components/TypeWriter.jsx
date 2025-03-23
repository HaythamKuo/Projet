// import { useState, useEffect } from "react";

// function TypeWriter({ text, delay, infinity }) {
//   const [currentTxt, setCurrentTxt] = useState("");
//   const [currentIndex, setCurrentIndex] = useState(0);

//   useEffect(() => {
//     let timeout;

//     if (currentIndex < text.length) {
//       timeout = setTimeout(() => {
//         setCurrentTxt((preTxt) => preTxt + text[currentIndex]);
//         setCurrentIndex((preIndex) => preIndex + 1);
//       }, delay);
//     } else if (infinity) {
//       setCurrentIndex(0);
//       setCurrentTxt("");
//     }
//     return () => clearTimeout(timeout);
//   }, [currentIndex, delay, text, infinity]);

//   return <span>{currentTxt}</span>;
// }
// export default TypeWriter;

import { useState, useEffect } from "react";
import styled from "styled-components";

// 使用 styled-components 定義樣式
const TypeWriterContainer = styled.span`
  display: inline-block;
  position: relative;
`;

const TypeWriterText = styled.span`
  display: inline-block;
`;

const Cursor = styled.span`
  display: inline-block;
  width: 2px;
  height: 1em;
  background-color: currentColor;
  margin-left: 2px;
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
        // 完成刪除
        //setIsDelaying(true);
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
    <TypeWriterContainer>
      <TypeWriterText>{displayText}</TypeWriterText>
      {showCursor && <Cursor />}
    </TypeWriterContainer>
  );
};

export default TypeWriter;
