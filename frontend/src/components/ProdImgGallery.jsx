import { useState } from "react";
import {
  Gallery,
  ThumbnailList,
  MainImgWrapper,
  ThumbnailWrapper,
  Thumbnail,
} from "../styles/ProdImgGallery.style";
import Image from "./Image";

function ProdImgGallery({ thumbnailSize = 60 }) {
  const dogs = [
    { id: 1, res: "/cat-3.jpg" },
    { id: 2, res: "/husky-1.jpg" },
    { id: 3, res: "/golden-2.jpg" },
    { id: 4, res: "/cat-2.jpg" },
  ];

  const [selectIndex, setSelectIndex] = useState(0);
  //console.log("current selectIndex", selectIndex, "→", dogs[selectIndex].res);

  return (
    <Gallery>
      <ThumbnailList>
        {dogs.map((item, i) => (
          <ThumbnailWrapper key={item.id} onClick={() => setSelectIndex(i)}>
            <Thumbnail
              src={item.res}
              w={thumbnailSize}
              h={thumbnailSize}
              $isActive={i === selectIndex}
            />
          </ThumbnailWrapper>
        ))}
      </ThumbnailList>

      <MainImgWrapper>
        <Image src={dogs[selectIndex].res} key={dogs[selectIndex].res} />
        {/* <img
          src={dogs[selectIndex].res}
          alt={`Test ${selectIndex}`}
          style={{ maxWidth: "500px", width: "100%" }}
        /> */}
      </MainImgWrapper>
    </Gallery>
  );
}
export default ProdImgGallery;
