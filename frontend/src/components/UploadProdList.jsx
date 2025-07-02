import { useState, useEffect, useRef } from "react";
import {
  MyImg,
  ImageWrapper,
  Delete,
  Edit,
  IconBox,
  ProdListContainer,
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

function UploadProdList() {
  const [target, setTarget] = useState(null);

  const { data, isLoading, isError } = useFetchMyProdsQuery();
  const [remove, { isLoading: deleting }] = useDeleteMyProdMutation();

  const [isScroll, setIsScroll] = useState(false);
  const dialogRef = useRef();

  function handleModal(target) {
    if (dialogRef.current && !dialogRef.current.open) {
      setTarget(target);
      dialogRef.current.showModal();
      setIsScroll(true);
    }
  }

  async function removeTargetDeed() {
    if (target) {
      try {
        const res = await remove(target);
        //toast.success("看來是刪除成功了");
        console.log(res);
      } catch (error) {
        console.log(error?.data?.message || error);
      }
      setIsScroll(false);
      //dialogRef.current.close();
    } else {
      toast.warn("看來是removeTargetDeed Fn 發生了一些問題");
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

  if (deleting) return <p>刪除中</p>;

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
    content = <p>目前沒有上傳的商品</p>;
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

  return (
    <>
      <Modal ref={dialogRef} onConfirm={removeTargetDeed} />
      <ProdListContainer>{content || "哈哈是我啦"}</ProdListContainer>
    </>
  );
}
export default UploadProdList;
