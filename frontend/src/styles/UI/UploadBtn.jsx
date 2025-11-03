import { useEffect, useRef, useState } from "react";
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
  onFileSelect,
  reset,
  existingImgs,
  onResetFinished,
}) => {
  const fileInputRef = useRef(null);
  const [preview, setPreview] = useState([]);

  function deleteSpecificImg(url) {
    const updated = preview.filter((item) =>
      item.isOld ? item.url.url !== url : item.url !== url
    );

    setPreview(updated);
    onFileSelect(updated);
  }

  const handleClick = () => {
    fileInputRef.current.click();
  };

  const handleChange = (e) => {
    const files = Array.from(e.target.files);

    const updateImgList = [];
    let loadCount = 0;

    files.forEach((img) => {
      const reader = new FileReader();
      reader.onloadend = () => {
        updateImgList.push({
          img,
          url: reader.result,
          isOld: false,
        });
        loadCount++;

        if (loadCount === files.length) {
          //  預覽用
          const saveDiverseImgs = [...preview, ...updateImgList];

          setPreview(saveDiverseImgs);
          // console.log(saveDiverseImgs);

          //傳遞父元件
          //onFileSelect((prev) => [...prev, ...updateImgList]);
          //onFileSelect([...preview, ...updateImgList]);

          // const fileOnly = saveDiverseImgs
          //   .filter((item) => !item.isOld)
          //   .map((item) => item.img);
          onFileSelect([...saveDiverseImgs]);
        }
      };
      reader.readAsDataURL(img);
    });
  };

  //為何上傳一張不用useEffect, 多張卻需要？
  useEffect(() => {
    if (reset) {
      setPreview([]);
      fileInputRef.current.value = null;
      onResetFinished?.();
    }
  }, [reset, onResetFinished]);

  useEffect(() => {
    if (existingImgs?.length > 0) {
      const previewImgs = existingImgs.map((url) => ({
        url,
        img: null,
        isOld: true,
      }));
      setPreview(previewImgs);
      onFileSelect(previewImgs);
    }
  }, [existingImgs, onFileSelect]);

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
        {preview &&
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
          })}
      </ImgContainer>
    </UploadWrapper>
  );
};

export default UploadButton;
