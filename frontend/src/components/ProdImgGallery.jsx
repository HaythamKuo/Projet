import { useState } from "react";
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
import HighLightSection from "../styles/UI/HighLightSection";
import {
  MdDeliveryDining,
  MdHomeRepairService,
  MdSquareFoot,
} from "react-icons/md";
import { TbTruckDelivery, TbBuildingFactory2, TbBox } from "react-icons/tb";

import { useFetchSpecificProdQuery } from "../store/apis/prodApiSlice";

function ProdImgGallery({ thumbnailSize = 100 }) {
  const datas = [
    { title: "Delivery & Returns", content: "在此填入配送與退貨的說明…" },
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
  const [count, setCount] = useState(0);

  //起始為空 因為不知道哪一個panel被開啟
  const [open, setOpen] = useState(null);
  const [staticOpen, setStaticOpen] = useState(false);

  const { prodid } = useParams();

  //控制數量
  function minusCount() {
    if (count <= 0) return;
    setCount((preCount) => preCount - 1);
  }

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

  //img={url:'', alt:'飯粒圖片'}

  function getHightlightImgs(images = []) {
    const filledImgs = [...images];

    while (filledImgs.length < 3) {
      filledImgs.push({ url: <DefaultImg />, alt: "預設圖片" });
    }

    return filledImgs.slice(0, 3).map((img, index) => ({
      ...img,
      attrs: ["column", "row", "row-reverse"][index],
    }));
  }

  const hightlightImgs = getHightlightImgs(images);

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

            <Item>
              <HeaderBtn onClick={() => setStaticOpen((pre) => !pre)}>
                我是title
                <Icon open={staticOpen}>+</Icon>
              </HeaderBtn>
              <AccordionContent open={staticOpen}>yyyy</AccordionContent>
            </Item>
          </Section>
        </InfoPanel>
      </Gallery>

      <HighlightSectionContainer>
        {hightlightImgs.map((item, i) => (
          <HighLightSection
            key={item.url + i}
            src={item.url}
            $attrs={item.attrs}
            alt={item.alt}
          />
        ))}
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
