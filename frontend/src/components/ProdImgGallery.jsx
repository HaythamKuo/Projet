import { useEffect, useState } from "react";
import {
  Gallery,
  ThumbnailList,
  MainImgWrapper,
  ThumbnailWrapper,
  Thumbnail,
  InfoPanel,
  Top,
  Center,
  Bottom,
  ControlAmounts,
  Plus,
  Minus,
} from "../styles/ProdImgGallery.style";
import Image from "./Image";
import Loader from "../styles/UI/Loader";

function ProdImgGallery({ thumbnailSize = 100 }) {
  const dogs = [
    { id: 1, res: "/cat-3.jpg" },
    { id: 2, res: "/husky-1.jpg" },
    { id: 3, res: "/golden-2.jpg" },
    { id: 4, res: "/cat-2.jpg" },
  ];

  const [selectIndex, setSelectIndex] = useState(0);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);
  }, [selectIndex]);

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
        {loading && <Loader width={810} height={810} />}
        <Image
          src={dogs[selectIndex].res}
          key={dogs[selectIndex].res}
          w={810}
          h={810}
          onLoad={() => setLoading(false)}
        />
      </MainImgWrapper>

      <InfoPanel>
        <Top>
          <h1 className="prodTitle">Golden-retriver</h1>
          <span className="prodPrice">$1299</span>
          <ControlAmounts>
            <button>
              <Minus />
            </button>
            <span>0</span>
            <button>
              <Plus />
            </button>
          </ControlAmounts>
        </Top>
        <Center></Center>
        <Bottom></Bottom>
      </InfoPanel>
    </Gallery>
  );
}
export default ProdImgGallery;
