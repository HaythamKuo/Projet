import { useEffect, useRef } from "react";
import styled from "styled-components";
import { TiDelete } from "react-icons/ti";
import { imgBasicStyle } from "../theme";

const UploadWrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1rem;
  align-items: flex-start;
  margin-top: 2rem;
`;

const UploadBtn = styled.button`
  background-color: #808080;
  color: white;
  padding: 10px 20px;
  font-size: 14px;
  border: none;
  border-radius: 6px;
  cursor: pointer;
  transition: background-color 0.3s ease;

  &:hover {
    background-color: #2980b9;
  }
`;

const ImgContainer = styled.div`
  display: flex;
  gap: 10px;
  flex-wrap: wrap;
`;

const PreviewWrapper = styled.div`
  position: relative;
  width: clamp(150px, 25vw, 250px);

  aspect-ratio: 16 / 9;
  border-radius: 8px;
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.2);
  overflow: hidden;
`;

const DeleteIcon = styled(TiDelete)`
  position: absolute;
  top: 6px;
  right: 6px;
  z-index: 10;
  color: white;
  cursor: pointer;
`;

const UploadPreview = styled.img`
  ${imgBasicStyle}
`;

const HiddenInput = styled.input`
  display: none;
`;

const UploadButton = ({
  // onFileSelect,
  // reset,
  // existingImgs,
  // onResetFinished,
  imgs = [],
  setImgs,
  reset,
}) => {
  const fileInputRef = useRef(null);

  // 用來追蹤這個元件產生過的所有 Blob URL，以便稍後清理
  const activeUrls = useRef([]);

  function handleDelete(position) {
    setImgs((pre) => {
      const target = pre[position];

      if (!target.isOld && target.url) {
        URL.revokeObjectURL(target.url);
        activeUrls.current = activeUrls.current.filter((u) => u !== target.url);
      }
      return pre.filter((_, index) => index !== position);
    });
  }

  const handleClick = () => {
    fileInputRef.current.click();
  };

  const handleChange = (e) => {
    const files = Array.from(e.target.files);
    if (files.length === 0) return;

    //處理多張圖片讀取
    const newImgs = files.map((file) => {
      const blobUrl = URL.createObjectURL(file);

      activeUrls.current.push(blobUrl);

      return {
        img: file, // 原始檔案 (給後端用)
        url: blobUrl, // Blob URL (給 <img> src 預覽用)
        isOld: false, // 標記為新圖
      };
    });

    setImgs((pre) => [...pre, ...newImgs]);

    //清空 input，允許重複選取同一張圖
    if (fileInputRef.current) {
      fileInputRef.current.value = null;
    }
  };

  // 清空 blobUrl unmount
  useEffect(() => {
    return () => {
      activeUrls.current.forEach((e) => {
        URL.revokeObjectURL(e);
      });
      activeUrls.current = [];
    };
  }, []);

  // --- 重置表單處理 ---
  useEffect(() => {
    if (reset) {
      if (fileInputRef.current) fileInputRef.current.value = null;
      // 注意：imgs 的清空是由父元件 (Hook) 控制的，這裡不需要 setImgs([])
    }
  }, [reset]);

  return (
    <UploadWrapper>
      <UploadBtn type="button" onClick={handleClick}>
        上傳圖片
      </UploadBtn>
      <HiddenInput
        multiple
        type="file"
        accept="image/*"
        ref={fileInputRef}
        onChange={handleChange}
      />
      <ImgContainer>
        {/* {preview &&
          preview.map((img, index) => {
            // <PreviewWrapper key={img.url}>
            //   <UploadPreview src={img.url} alt="圖片預覽" />
            //   <DeleteIcon onClick={() => deleteSpecificImg(img.url)} />
            // </PreviewWrapper>

            if (img.isOld) {
              //舊圖
              return (
                <PreviewWrapper key={img.url + index}>
                  <UploadPreview src={img.url.url} alt={img.url.alt} />
                  <DeleteIcon onClick={() => deleteSpecificImg(img.url.url)} />
                </PreviewWrapper>
              );
            } else {
              //新圖
              return (
                <PreviewWrapper key={img.url + index}>
                  <UploadPreview src={img.url} alt="圖片預覽" />
                  <DeleteIcon onClick={() => deleteSpecificImg(img.url)} />
                </PreviewWrapper>
              );
            }
          })} */}

        {imgs.map((item, index) => {
          console.log(item);

          return (
            <PreviewWrapper key={index}>
              <UploadPreview src={item.url} alt="preview" />
              <DeleteIcon onClick={() => handleDelete(index)} />
            </PreviewWrapper>
          );
        })}
      </ImgContainer>
    </UploadWrapper>
  );
};

// const UploadButton = ({ imgs = [], setImgs, reset }) => {
//   const fileInputRef = useRef(null);

//   const handleClick = () => {
//     fileInputRef.current.click();
//   };

//   const handleDelete = (targetUrl) => {
//     // 過濾掉被點擊刪除的圖片
//     const updatedImgs = imgs.filter((item) => item.url !== targetUrl);
//     setImgs(updatedImgs);
//   };

//   const handleChange = (e) => {
//     const files = Array.from(e.target.files);
//     if (files.length === 0) return;

//     // 處理多張圖片讀取
//     const newImagesPromise = files.map((file) => {
//       return new Promise((resolve) => {
//         const reader = new FileReader();
//         reader.onloadend = () => {
//           resolve({
//             img: file, // 原始檔案 (用於 FormData)
//             url: reader.result, // Base64 URL (用於預覽)
//             isOld: false, // 標記為新圖片
//           });
//         };
//         reader.readAsDataURL(file);
//       });
//     });

//     // 等待所有圖片讀取完成後，一次更新 State
//     Promise.all(newImagesPromise).then((newImgObjects) => {
//       setImgs((prev) => [...prev, ...newImgObjects]);

//       // 清空 input 讓同一張圖可以再次被選取 (如果使用者刪掉後後悔)
//       if (fileInputRef.current) {
//         fileInputRef.current.value = null;
//       }
//     });
//   };

//   // 監聽重置訊號 (僅負責清空 input 元素的 value)
//   // imgs 的清空已經在 Hook 的 resetState 中透過 setImgs([]) 完成了，這裡不需要再操作 state
//   useEffect(() => {
//     if (reset && fileInputRef.current) {
//       fileInputRef.current.value = null;
//     }
//   }, [reset]);

//   return (
//     <UploadWrapper>
//       <UploadBtn type="button" onClick={handleClick}>
//         上傳圖片
//       </UploadBtn>

//       <HiddenInput
//         multiple
//         type="file"
//         accept="image/*"
//         ref={fileInputRef}
//         onChange={handleChange}
//         style={{ display: "none" }} // 確保隱藏
//       />

//       <ImgContainer>
//         {imgs.map((item, index) => (
//           <PreviewWrapper key={item.url + index}>
//             <UploadPreview src={item.url} alt="preview" />
//             <DeleteIcon onClick={() => handleDelete(item.url)} />
//           </PreviewWrapper>
//         ))}
//       </ImgContainer>
//     </UploadWrapper>
//   );
// };

export default UploadButton;
