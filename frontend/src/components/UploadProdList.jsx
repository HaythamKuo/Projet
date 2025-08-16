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
  PromptTitle,
} from "../styles/UploadProdList.style";

import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import {
  useDeleteMyProdMutation,
  useFetchMyProdsQuery,
} from "../store/apis/prodApiSlice";
import Skeleton, {
  SkeletonCardItem,
  SkeletonCard,
} from "../styles/UI/Skeleton";
import Modal from "./Modal";
import ProcessLoader from "../styles/UI/ProcessLoader";

function UploadProdList() {
  const [target, setTarget] = useState(null);

  const { data, isLoading, isError } = useFetchMyProdsQuery();
  const [remove, { isLoading: deleting }] = useDeleteMyProdMutation();

  const [isOpen, setIsOpen] = useState(false);
  const [isScroll, setIsScroll] = useState(false);
  const dialogRef = useRef();

  //叫出Modal 二次確認是否要刪除產品
  function handleModal(target) {
    if (dialogRef.current && !dialogRef.current.open) {
      setTarget(target);
      setIsOpen(true);
      //dialogRef.current.showModal();
      setIsScroll(true);
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
    const dialogEl = dialogRef.current;
    const handleModalClose = () => setIsScroll(false);

    //監控modal是否存在 會間接影響Scroll條
    if (dialogEl) {
      dialogEl.addEventListener("close", handleModalClose);
    }

    if (isScroll) {
      document.body.style.overflow = "hidden";
    }
    return () => {
      if (dialogEl) dialogEl.removeEventListener("close", handleModalClose);

      document.body.style.overflow = "";
    };
  }, [isScroll]);

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
        <PromptTitle>該上傳自己的商品了吧</PromptTitle>
        <PromptProd />
      </EmptyWrapper>
    );
  } else {
    content = data.map((item) => (
      <ImageWrapper key={item._id}>
        <IconBox>
          <Delete onClick={() => handleModal(item._id)} />
          <Link to={`/edit-product/${item._id}`}>
            <Edit />
          </Link>
        </IconBox>
        <MyImg src={item.images[0].url} alt={item.name} />
      </ImageWrapper>
    ));
  }

  //父要如何監控 Modal 關閉或是開啟
  return (
    <>
      {deleting && <ProcessLoader />}
      <Modal isOpen={isOpen} onClose={() => setIsOpen(false)} ref={dialogRef}>
        <h1>這是彈跳式視窗</h1>
        <p>確定要刪除嗎</p>

        <button type="button" onClick={removeTargetDeed}>
          確定
        </button>
        <button onClick={() => setIsOpen(false)}>取消</button>
      </Modal>
      <ProdListContainer>{content || "哈哈是我啦"}</ProdListContainer>
    </>
  );
}
export default UploadProdList;
