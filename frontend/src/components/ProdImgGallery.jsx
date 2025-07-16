import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
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
  HighlightSectionContainer,
  BottomWrapper,
  IconWrapper,
  MinorTitle,
  MinorDes,
  BottomContainer,
  DefaultImg,
} from "../styles/ProdImgGallery.style";
//import Image from "./Image";
import Loader from "../styles/UI/Loader";
import HighLightSection from "../styles/UI/HighLightSection";
import {
  MdDeliveryDining,
  MdHomeRepairService,
  MdSquareFoot,
  MdOutlineBrokenImage,
} from "react-icons/md";
import { TbTruckDelivery, TbBuildingFactory2, TbBox } from "react-icons/tb";

import { useFetchSpecificProdQuery } from "../store/apis/prodApiSlice";

function ProdImgGallery({ thumbnailSize = 100 }) {
  const dogs = [
    { id: 1, res: "/cat-2.jpg" },
    { id: 2, res: "/husky-2.jpg" },
    { id: 3, res: "/golden-2.jpg" },
    { id: 4, res: "/cat.jpg" },
  ];

  const datas = [
    { title: "Delivery & Returns", content: "在此填入配送與退貨的說明…" },
    { title: "Size & Fit", content: "在此填入尺寸與合身度說明…" },
    { title: "How This Was Made", content: "在此填入商品製作方式說明…" },
  ];

  const InfoData = [
    {
      title: "免費且速速的運輸",
      Icon: <TbTruckDelivery />,
      des: "lorem10lorem10lorem10lorem10lorem10lorem10",
    },
    {
      title: "25hr速速送",
      Icon: <TbBuildingFactory2 />,
      des: "lorem10lorem10lorem10lorem10lorem10lorem10",
    },
    {
      title: "不準退貨喔喔喔",
      Icon: <TbBox />,
      des: "lorem10lorem10lorem10lorem10lorem10lorem10",
    },
  ];

  const [selectIndex, setSelectIndex] = useState(0);
  const [loading, setLoading] = useState(true);
  const [count, setCount] = useState(0);

  //起始為空 因為不知道哪一個panel被開啟
  const [open, setOpen] = useState(null);

  const { prodid } = useParams();

  //控制數量
  function minusCount() {
    if (count <= 0) return;
    setCount((preCount) => preCount - 1);
  }

  useEffect(() => {
    setLoading(true);
  }, [selectIndex]);

  const {
    data: prod,
    isLoading,
    isError,
    error,
  } = useFetchSpecificProdQuery(prodid);

  if (isLoading) {
    return <p>載入中....</p>;
  }
  if (isError) {
    return <p>{error?.data?.message || "發生錯誤"}</p>;
  }

  let total = 4;
  const { images = [] } = prod;
  const selectImage = images[selectIndex];

  const spreadImgs = [
    ...images.map((item) => ({ ...item, isPlaceholder: false })),
    ...Array.from({ length: Math.max(0, total - images.length) }, (_, i) => ({
      id: `default-${i}`,
      url: <DefaultImg />,
      alt: "預設圖片",
      isPlaceholder: true,
    })),
  ];

  return (
    <GalleryContainer>
      <Gallery>
        <ThumbnailList>
          {spreadImgs.map((item, i) => (
            <ThumbnailWrapper
              key={item.id || `placeholder-${i}`}
              onClick={() => setSelectIndex(i)}
            >
              <Thumbnail
                src={item.url}
                $isActive={i === selectIndex}
                $isPlaceholder={item.isPlaceholder}
              />
            </ThumbnailWrapper>
          ))}
        </ThumbnailList>

        <MainImgWrapper>
          {selectImage ? (
            <SingleImgCard
              src={selectImage.url}
              key={selectImage.url}
              alt={selectImage.alt}
            />
          ) : (
            <DefaultImg />
          )}
        </MainImgWrapper>

        <InfoPanel>
          <Top>
            <h1 className="prodTitle">{prod.name}</h1>
            <span className="prodPrice">$ {prod.price}</span>
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

      <HighlightSectionContainer>
        <HighLightSection $attrs="column" />

        <HighLightSection $attrs="row" />
        <HighLightSection $attrs="row-reverse" />
      </HighlightSectionContainer>
      <BottomContainer>
        {InfoData.map((data, i) => (
          <BottomWrapper key={i}>
            <IconWrapper>{data.Icon}</IconWrapper>
            <MinorTitle>{data.title}</MinorTitle>
            <MinorDes>{data.des}</MinorDes>
          </BottomWrapper>
        ))}
      </BottomContainer>
    </GalleryContainer>
  );
}
export default ProdImgGallery;
