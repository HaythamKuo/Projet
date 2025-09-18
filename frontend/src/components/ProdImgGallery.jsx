import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";

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
  GalleryContainer,
  HighlightSectionContainer,
  BottomWrapper,
  IconWrapper,
  MinorTitle,
  MinorDes,
  BottomContainer,
  DefaultImg,
  TopAmount,
  BottomAmount,
} from "../styles/ProdImgGallery.style";

import HighLightSection from "../styles/UI/HighLightSection";
import ProcessLoader from "../styles/UI/ProcessLoader";
import {
  MdDeliveryDining,
  MdHomeRepairService,
  MdSquareFoot,
} from "react-icons/md";
import { TbTruckDelivery, TbBuildingFactory2, TbBox } from "react-icons/tb";

import { fetchGoods } from "../store/thunks/fetchGoods";
import { useFetchSpecificProdQuery } from "../store/apis/prodApiSlice";
import { addGoods } from "../store/thunks/addGoods";
import {
  selectCartItems,
  increaseItem,
  decreaseItem,
} from "../store/slices/cartSlice";

function ProdImgGallery() {
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

  const [firstItem, setFirstItem] = useState({ S: 0, M: 0, L: 0 });
  const { prodid } = useParams();

  const { userInfo } = useSelector((state) => state.auth);
  const cartItems = useSelector((state) => {
    const items = selectCartItems(state);
    return items.find((item) => item.productId._id === prodid);
  });

  const dispatch = useDispatch();
  const [selectIndex, setSelectIndex] = useState(0);

  //console.log(cartItems);

  //控制數量
  function plusCount(size) {
    const previousSum = cartItems?.selectedSizes
      ? Object.values(cartItems.selectedSizes).reduce(
          (acc, item) => acc + item,
          0
        )
      : 0;

    if (previousSum === 0) {
      setFirstItem((pre) => ({ ...pre, [size]: (pre[size] || 0) + 1 }));
    } else {
      dispatch(increaseItem({ prodid, size }));
    }
  }

  function minusCount(size) {
    //先算當前數量
    const previousSum = cartItems?.selectedSizes
      ? Object.values(cartItems.selectedSizes).reduce(
          (acc, item) => acc + item,
          0
        )
      : 0;

    if (previousSum === 0) {
      setFirstItem((pre) => {
        if (pre[size] === 0) {
          return pre;
        } else {
          return { ...pre, [size]: (pre[size] || 0) - 1 };
        }
      });
    } else {
      dispatch(decreaseItem({ prodid, size }));
    }
  }
  const isFirstAdd = !cartItems?.productId;

  const {
    data: prod,
    isLoading,
    isError,
    error,
  } = useFetchSpecificProdQuery(prodid);

  //實際加入購物車的 action
  async function addToCart() {
    let sum;

    if (isFirstAdd) {
      sum = Object.values(firstItem).reduce((acc, size) => acc + size, 0);
    } else {
      sum = Object.values(cartItems.selectedSizes).reduce(
        (acc, size) => acc + size,
        0
      );
    }

    if (sum === 0) {
      toast.error("至少選擇一尺寸且數量不能為0");
      return;
    }

    try {
      await dispatch(
        addGoods({
          productId: prodid,
          selectedSizes: isFirstAdd ? firstItem : cartItems.selectedSizes,
          unitPrice: prod.price,
        })
      ).unwrap();
      toast.success("加進購物車成功");
    } catch (error) {
      console.log(error);
      toast.error(error?.message || "加入購物車失敗");
    }
  }

  useEffect(() => {
    if (userInfo) {
      dispatch(fetchGoods());
    }
  }, [dispatch, userInfo]);

  if (isLoading) {
    return <ProcessLoader />;
  }
  if (isError) {
    // return <p>{error?.data?.message || "發生錯誤"}</p>;
    console.log(error);
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

            {["S", "M", "L"].map((size) => (
              <ControlAmounts key={size}>
                <TopAmount>
                  <p>{size}</p>
                </TopAmount>
                <BottomAmount>
                  <button onClick={() => minusCount(size)}>
                    <Minus />
                  </button>
                  <span>
                    {isFirstAdd
                      ? firstItem[size] ?? 0
                      : cartItems?.selectedSizes?.[size] ?? 0}
                  </span>
                  <button onClick={() => plusCount(size)}>
                    <Plus />
                  </button>
                </BottomAmount>
              </ControlAmounts>
            ))}

            <SubmitBox>
              <SubmitBtn onClick={() => addToCart()}>加入購物車</SubmitBtn>
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
