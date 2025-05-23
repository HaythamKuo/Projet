import { useEffect, useState } from "react";
import {
  Gallery,
  ThumbnailList,
  MainImgWrapper,
  ThumbnailWrapper,
  SingleImgCard,
  Thumbnail,
  InfoPanel,
  Top,
  Center,
  ControlAmounts,
  Plus,
  Minus,
  SubmitBox,
  SubmitBtn,
  Section,
  Item,
  HeaderBtn,
  Icon,
  AccordionContent,
  GalleryContainer,
} from "../styles/ProdImgGallery.style";
import Image from "./Image";
import Loader from "../styles/UI/Loader";
import {
  MdDeliveryDining,
  MdHomeRepairService,
  MdSquareFoot,
} from "react-icons/md";

function ProdImgGallery({ thumbnailSize = 100 }) {
  const dogs = [
    { id: 1, res: "/cat-2.jpg" },
    { id: 2, res: "/husky-2.jpg" },
    { id: 3, res: "/golden-2.jpg" },
    { id: 4, res: "/cat-1.jpg" },
  ];

  const datas = [
    { title: "Delivery & Returns", content: "在此填入配送與退貨的說明…" },
    { title: "Size & Fit", content: "在此填入尺寸與合身度說明…" },
    { title: "How This Was Made", content: "在此填入商品製作方式說明…" },
  ];

  const [selectIndex, setSelectIndex] = useState(0);
  const [loading, setLoading] = useState(true);
  const [count, setCount] = useState(0);

  //起始為空 因為不知道哪一個panel被開啟
  const [open, setOpen] = useState(null);

  //控制數量
  function minusCount() {
    if (count <= 0) return;
    setCount((preCount) => preCount - 1);
  }

  useEffect(() => {
    setLoading(true);
  }, [selectIndex]);

  return (
    <GalleryContainer>
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
          {/* <Image
          src={dogs[selectIndex].res}
          key={dogs[selectIndex].res}
          onLoad={() => setLoading(false)}
        /> */}

          <SingleImgCard
            src={dogs[selectIndex].res}
            key={dogs[selectIndex].res}
            onLoad={() => setLoading(false)}
          />
        </MainImgWrapper>

        <InfoPanel>
          <Top>
            <h1 className="prodTitle">Goldenretriver</h1>
            <span className="prodPrice">$1299</span>
            <ControlAmounts>
              <button onClick={minusCount}>
                <Minus />
              </button>
              <span>{count}</span>
              <button onClick={() => setCount((preCount) => preCount + 1)}>
                <Plus />
              </button>
            </ControlAmounts>
            <SubmitBox>
              <SubmitBtn>加入購物車</SubmitBtn>
              <SubmitBtn>直接購買</SubmitBtn>
            </SubmitBox>
          </Top>
          <Center>
            <div className="ProflieIcon">
              <MdDeliveryDining />
              <span>免費且快捷的運輸</span>
            </div>
            <div className="ProflieIcon">
              <MdHomeRepairService />
              <span>完善的售後服務</span>
            </div>
            <div className="ProflieIcon">
              <MdSquareFoot />
              <span>降低碳足跡排放</span>
            </div>
          </Center>
          <Section>
            {datas.map((content, i) => {
              // 表有沒有按到同一個panel
              const isOpen = open === i;

              return (
                <Item key={content.title}>
                  <HeaderBtn onClick={() => setOpen(isOpen ? null : i)}>
                    {content.title}
                    <Icon open={isOpen}>+</Icon>
                  </HeaderBtn>
                  <AccordionContent open={isOpen}>
                    {content.content}
                  </AccordionContent>
                </Item>
              );
            })}
          </Section>
        </InfoPanel>
      </Gallery>
    </GalleryContainer>
  );
}
export default ProdImgGallery;
