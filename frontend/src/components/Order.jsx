import { useEffect, useRef, useState, useMemo, Fragment } from "react";
import { useGetOrderQuery } from "../store/apis/orderAPi";
import {
  useCreateReviewMutation,
  useLazyFetchSpecificReviewsQuery,
} from "../store/apis/reviewSlice";

import {
  Right,
  Left,
  OrderTop,
  OrderContainer,
  OrderBlock,
  OrderStatus,
  OrderDate,
  OrderItems,
  OrderRight,
  OrderImg,
  ImgWrapper,
  Prodname,
  Quantity,
  OrderId,
  OrderTotal,
  ModalBox,
  ReviewArea,
  ErrRes,
  CommentConfirm,
  CommentCancel,
  ShowNewBtn,
  BtnBox,
  ConfineBox,
  ModalProdName,
  SortBox,
  DistractSvg,
  NoOrderBox,
} from "../styles/order.style";
import ProcessLoader from "../styles/UI/ProcessLoader";
import ReviewStars from "../styles/UI/ReviewStars";
import Modal from "./Modal";
import { useScrollBlock } from "../hooks/useScrollBlock";
import { ValidateReviews } from "../utils/validation";
import ShinyText from "./reactBit/ShinyText";

function Order() {
  const dialogRef = useRef();
  const [isOpen, setIsOpen] = useState(false);
  const [showAll, setShowAll] = useState(true);
  const [sortOrder, setSortOrder] = useState("desc");
  const [orderIdentity, setOrderIdentity] = useState(null);
  const [review, setReview] = useState({});
  const [submitAdmission, setSubmitAdmission] = useState([]);
  const [err, setErr] = useState("");

  //監控Modal 並鎖住背景滾動
  const [blockScroll, allowScroll] = useScrollBlock(dialogRef);

  /**
   * 取得訂單資料
   *
   * @function useGetOrderQuery
   * @param {Object} params - 查詢參數
   * @param {boolean} params.all - 是否抓取所有訂單
   * @param {string} params.sort - 排序方式
   * @returns {Object} 查詢結果
   * @returns {Array} returns.data - 訂單列表
   * @returns {boolean} returns.isLoading - 請求是否載入中
   */

  const { data, isLoading } = useGetOrderQuery({
    all: showAll,
    sort: sortOrder,
  });

  //創造評論
  const [postReviews, { isLoading: creating }] = useCreateReviewMutation();

  //抓評論並顯示評論得地方
  const [trigerFetch, { data: cloudReview = [], isLoading: fetching, reset }] =
    useLazyFetchSpecificReviewsQuery();

  const prods = useMemo(() => {
    if (!data || !orderIdentity) return [];

    const currentOrder = data?.find((o) => o._id === orderIdentity);
    return currentOrder?.orderItems || [];
  }, [orderIdentity, data]);

  //監控 isOpen 在Modal關閉時將資料清乾淨
  useEffect(() => {
    if (isOpen && orderIdentity) {
      trigerFetch(orderIdentity);
    } else {
      reset();
      setReview({});
      setOrderIdentity(null);
      setErr("");

      //setSubmitAdmission([]);
    }
  }, [isOpen, prods, orderIdentity, reset, trigerFetch]);

  useEffect(() => {
    if (isOpen && dialogRef.current) {
      blockScroll();
    } else {
      allowScroll();
    }
  }, [isOpen, blockScroll, allowScroll]);

  function showModal(id) {
    setOrderIdentity(id);
    setIsOpen(true);
  }
  //console.log(prods);

  async function handleReviews(e) {
    e.preventDefault();
    setErr("");

    const reviewEntries = Object.entries(review);
    const { isErr, message } = ValidateReviews(reviewEntries);

    if (isErr) {
      setErr(message);
      return;
    }

    const reviews = reviewEntries``
      .filter(([_, { comment }]) => comment?.trim().length > 0)
      .map(([prodId, { rank, comment }]) => ({
        prodId,
        rank: rank ?? 1,
        comment: comment ?? "",
      }));

    const payload = {
      orderId: orderIdentity,
      reviews,
    };

    setSubmitAdmission((pre) => [
      ...pre,
      ...reviews.map((review) => review.prodId),
    ]);

    try {
      setIsOpen(false);
      //console.log(payload);

      await postReviews(payload).unwrap();
    } catch (error) {
      console.log(error);

      setSubmitAdmission((pre) =>
        pre.filter((id) => !reviews.some((r) => r.prodId === id))
      );
    }
  }

  // console.log(cloudReview);

  if (isLoading) return <ProcessLoader />;
  if (creating) return <p>上傳中</p>;
  if (fetching) return <p>串連中</p>;
  if (!data || data.length === 0)
    return (
      <NoOrderBox>
        <DistractSvg />

        <ShinyText text="目前沒有訂單喔" />
      </NoOrderBox>
    );

  return (
    <OrderContainer>
      <Modal
        isOpen={isOpen}
        ref={dialogRef}
        height="50%"
        onClose={() => setIsOpen(false)}
        minorHeight="750px"
      >
        {fetching && <p>串連中</p>}
        {!fetching && (
          <ModalBox onSubmit={handleReviews}>
            <ConfineBox>
              {prods?.map((prod) => (
                <Fragment key={prod.product}>
                  <ModalProdName>{prod.name}</ModalProdName>
                  <ReviewStars
                    disable={cloudReview?.some(
                      (e) => e.productId === prod.product
                    )}
                    prodId={prod.product}
                    rating={
                      cloudReview?.find((e) => e.productId === prod.product)
                        ?.rating ??
                      review[prod.product]?.rank ??
                      1
                    }
                    onChange={(newRank) => {
                      setReview((pre) => ({
                        ...pre,
                        [prod.product]: {
                          ...(pre[prod.product] || {}),
                          rank: newRank,
                        },
                      }));
                    }}
                  />
                  <ReviewArea
                    name={prod.product}
                    placeholder="字數不得超過20字"
                    disabled={cloudReview?.some(
                      (e) => e.productId === prod.product
                    )}
                    value={
                      cloudReview.find((e) => e.productId === prod.product)
                        ?.comment ??
                      review[prod.product]?.comment ??
                      ""
                    }
                    onChange={(e) => {
                      const newComment = e.target.value;
                      setErr("");
                      setReview((pre) => ({
                        ...pre,
                        [prod.product]: {
                          ...(pre[prod.product] || {}),
                          comment: newComment,
                        },
                      }));
                    }}
                  />
                </Fragment>
              ))}
            </ConfineBox>

            {err && <ErrRes>{err}</ErrRes>}

            <BtnBox
              style={{
                display: "flex",
                justifyContent: "center",
                gap: "1rem",
              }}
            >
              <CommentConfirm disabled={!!cloudReview?.length}>
                確定
              </CommentConfirm>
              <CommentCancel onClick={() => setIsOpen(false)}>
                取消
              </CommentCancel>
            </BtnBox>
          </ModalBox>
        )}
      </Modal>
      <SortBox>
        <ShowNewBtn onClick={() => setShowAll((pre) => !pre)}>
          {showAll ? "最新訂單" : "全部訂單"}
        </ShowNewBtn>
        <ShowNewBtn
          onClick={() =>
            setSortOrder((pre) => (pre === "desc" ? "asc" : "desc"))
          }
          disabled={!showAll}
        >
          {/* {sortOrder === "asc" ? "由新到舊" : "由舊到新"} */}
          {sortOrder === "asc" ? "由舊到新" : "由新到舊"}
        </ShowNewBtn>
      </SortBox>

      {data?.map((order) => (
        <OrderBlock key={order._id}>
          <Left>
            <OrderTop>
              <OrderStatus>
                {order.status === "paid" ? "已送達" : "運輸中"}
              </OrderStatus>
              <OrderDate>送達日期 {order.createdAtFormatted}</OrderDate>
            </OrderTop>

            {order.orderItems?.map((prod) => (
              <OrderItems key={prod._id}>
                <ImgWrapper>
                  <OrderImg src={prod?.product.images[0].url} alt={"pic"} />
                </ImgWrapper>
                <OrderRight>
                  <Prodname>{prod.name}</Prodname>
                  <Quantity>數量： {prod.quantity}</Quantity>
                </OrderRight>
              </OrderItems>
            ))}
          </Left>

          <Right>
            <OrderId>
              訂單編號 ↓
              <br />#{order._id}
            </OrderId>
            <OrderTotal>總額: ${order.totalPrice}</OrderTotal>
            <CommentConfirm onClick={() => showModal(order._id)}>
              給予評價
            </CommentConfirm>
          </Right>
        </OrderBlock>
      ))}
    </OrderContainer>
  );
}
export default Order;
