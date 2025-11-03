import { useState, useEffect, useRef } from "react";
import {
  MyImg,
  ImageWrapper,
  Delete,
  Edit,
  IconBox,
  ProdListContainer,
  EmptyWrapper,
  PromptProd,
  MyImgWrapper,
} from "../styles/UploadProdList.style";

import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import {
  useDeleteMyProdMutation,
  useFetchMyProdsQuery,
} from "../store/apis/prodApiSlice";
import Skeleton, { SkeletonCardItem } from "../styles/UI/Skeleton";
import Modal from "./Modal";
import ProcessLoader from "../styles/UI/ProcessLoader";
import { ConfirmTxt, BtnContainer } from "./Collections";
import { SubmitBtn, CancelBtn } from "../styles/ProdImgGallery.style";
import ShinyText from "./reactBit/ShinyText";
import { useScrollBlock } from "../hooks/useScrollBlock";

function UploadProdList() {
  const [target, setTarget] = useState(null);

  const { data, isLoading, isError } = useFetchMyProdsQuery();
  const [remove, { isLoading: deleting }] = useDeleteMyProdMutation();

  const [isOpen, setIsOpen] = useState(false);

  const dialogRef = useRef();

  //限制滾動
  const [blockScroll, allowScroll] = useScrollBlock(dialogRef);

  //叫出Modal 二次確認是否要刪除產品
  function handleModal(target) {
    if (dialogRef.current && !dialogRef.current.open) {
      setTarget(target);
      setIsOpen(true);
    }
  }

  async function removeTargetDeed() {
    if (!target) {
      toast.warn("刪除函數接收的 target 無效");
      return;
    }
    setIsOpen(false);

    try {
      const res = await remove(target).unwrap();
      console.log(res);
    } catch (error) {
      console.log(error?.data?.message || error);
    } finally {
      setTarget(null);
    }
  }

  useEffect(() => {
    if (isOpen) {
      blockScroll();
    } else {
      allowScroll();
    }
  }, [isOpen, blockScroll, allowScroll]);

  let content;
  if (isLoading) {
    content = Array.from({ length: 3 }, (_, index) => (
      <SkeletonCardItem key={index}>
        <Skeleton />
      </SkeletonCardItem>
    ));
  } else if (isError) {
    content = <p>發生一些錯誤</p>;
  } else if (!data || !Array.isArray(data) || data.length === 0) {
    content = (
      <EmptyWrapper>
        <ShinyText text="該上傳自己的商品了吧" />
        <PromptProd />
      </EmptyWrapper>
    );
  } else {
    content = data.map((item) => (
      <ImageWrapper key={item._id}>
        <IconBox>
          <Delete onClick={() => handleModal(item._id)} />
          <Link to={`edit-product/${item._id}`}>
            <Edit />
          </Link>
        </IconBox>
        <Link to={`/products/${item._id}`}>
          <MyImgWrapper>
            <MyImg src={item.images[0].url} alt={item.name} />
          </MyImgWrapper>
        </Link>
      </ImageWrapper>
    ));
  }

  //父要如何監控 Modal 關閉或是開啟
  return (
    <>
      {deleting && <ProcessLoader />}
      <Modal
        isOpen={isOpen}
        onClose={() => setIsOpen(false)}
        ref={dialogRef}
        width="500px"
        height="500px"
      >
        <ConfirmTxt>確定要刪除嗎</ConfirmTxt>
        <BtnContainer>
          <SubmitBtn type="button" onClick={removeTargetDeed}>
            確定
          </SubmitBtn>
          <CancelBtn onClick={() => setIsOpen(false)}>取消</CancelBtn>
        </BtnContainer>
      </Modal>
      <ProdListContainer>{content || "哈哈是我啦"}</ProdListContainer>
    </>
  );
}
export default UploadProdList;
