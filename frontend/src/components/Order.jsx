import { useEffect, useRef, useState, useMemo } from "react";
import { useGetOrderQuery } from "../store/apis/orderAPi";
import {
  useCreateReviewMutation,
  useLazyFetchSpecificReviewsQuery,
} from "../store/apis/reviewSlice";
import { toast } from "react-toastify";

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
  TestImg,
  ImgWrapper,
  Prodname,
  Quantity,
  RankBtn,
  OrderId,
  OrderTotal,
  ModalBox,
  ReviewArea,
  InnerBox,
  CommentConfirm,
  CommentCancel,
} from "../styles/order.style";
import ProcessLoader from "../styles/UI/ProcessLoader";
import ReviewStars from "../styles/UI/ReviewStars";
import Modal from "./Modal";
import { ValidateReviews } from "../utils/validation";

function Order() {
  const dialogRef = useRef();
  const [isOpen, setIsOpen] = useState(false);
  const [showAll, setShowAll] = useState(true);
  const [sortOrder, setSortOrder] = useState("desc");
  const [orderIdentity, setOrderIdentity] = useState(null);
  const [review, setReview] = useState({});
  const [submitAdmission, setSubmitAdmission] = useState([]);

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

  //抓評論
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
      //setSubmitAdmission([]);
    }
  }, [isOpen, prods, orderIdentity, reset, trigerFetch]);

  function showModal(id) {
    setOrderIdentity(id);
    setIsOpen(true);
  }
  //console.log(prods);

  async function handleReviews(e) {
    e.preventDefault();

    const reviewEntries = Object.entries(review);
    //const { isErr, message } = ValidateReviews(reviewEntries);
    console.log(reviewEntries);

    const commentHasValue = reviewEntries.some(
      ([_, { comment }]) => comment?.trim().length > 0
    );
    const commentHasLength = reviewEntries.every(
      ([_, { comment }]) => comment?.trim().length <= 20
    );

    if (!commentHasValue || !commentHasLength) {
      toast.warn("至少要有一筆評論，且每則評論不能超過 20 字");
      return;
    }

    const reviews = reviewEntries
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
    //68a046d4f1833ceaf964abac
    //console.log(reviews);

    setSubmitAdmission((pre) => [
      ...pre,
      ...reviews.map((review) => review.prodId),
    ]);

    // console.log(data);
    // console.log(prods);

    try {
      setIsOpen(false);
      //console.log(payload);

      const res = await postReviews(payload).unwrap();
      //   console.log(res);
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
  if (!data || data.length === 0) return <p>沒有訂單</p>;

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
            <InnerBox>
              {prods?.map((prod) => (
                <div key={prod.product}>
                  <p>{prod.name}</p>
                  <ReviewStars
                    // disable={submitAdmission.includes(prod._id)}
                    disable={cloudReview?.some(
                      (e) => e.productId === prod.product
                    )}
                    prodId={prod.product}
                    // rating={review[prod._id]?.rank || 1}
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
                    //disabled={submitAdmission.includes(prod._id)}
                    disabled={cloudReview?.some(
                      (e) => e.productId === prod.product
                    )}
                    // value={review[prod._id]?.comment || ""}
                    value={
                      cloudReview.find((e) => e.productId === prod.product)
                        ?.comment ??
                      review[prod.product]?.comment ??
                      ""
                    }
                    onChange={(e) => {
                      const newComment = e.target.value;
                      setReview((pre) => ({
                        ...pre,
                        [prod.product]: {
                          ...(pre[prod.product] || {}),
                          comment: newComment,
                        },
                      }));
                    }}
                  />
                </div>
              ))}
            </InnerBox>
            <div
              style={{ display: "flex", justifyContent: "center", gap: "1rem" }}
            >
              <CommentConfirm disabled={!!cloudReview?.length}>
                確定
              </CommentConfirm>
              <CommentCancel onClick={() => setIsOpen(false)}>
                取消
              </CommentCancel>
            </div>
          </ModalBox>
        )}
      </Modal>
      <button
        style={{ display: "block", width: "4rem" }}
        onClick={() => setShowAll((pre) => !pre)}
      >
        {showAll ? "最新訂單" : "全部訂單"}
      </button>
      <button
        style={{ display: "block", width: "4rem" }}
        onClick={() => setSortOrder((pre) => (pre === "desc" ? "asc" : "desc"))}
        disabled={!showAll}
      >
        {/* {sortOrder === "asc" ? "由新到舊" : "由舊到新"} */}
        {sortOrder === "asc" ? "由舊到新" : "由新到舊"}
      </button>

      {data?.map((order) => (
        <OrderBlock key={order._id}>
          <Left>
            <OrderTop>
              <OrderStatus>
                {order.status === "paid" ? "已送達" : "運輸中"}
              </OrderStatus>
              <OrderDate>送達日期 {order.createdAtFormatted}</OrderDate>
            </OrderTop>

            {/* 這裡如果每張訂單裡還有多個商品，可以再嵌套 map */}
            {order.orderItems?.map((prod) => (
              <OrderItems key={prod._id}>
                <ImgWrapper>
                  <TestImg alt={"pic"} />
                </ImgWrapper>
                <OrderRight>
                  <Prodname>{prod.name}</Prodname>
                  <Quantity>數量： {prod.quantity}</Quantity>
                  <RankBtn>給予評價</RankBtn>
                </OrderRight>
              </OrderItems>
            ))}
          </Left>

          <Right>
            <OrderId>訂單編號: #{order._id}</OrderId>
            <OrderTotal>總額: ${order.totalPrice}</OrderTotal>
            <RankBtn onClick={() => showModal(order._id)}>給予評價</RankBtn>
          </Right>
        </OrderBlock>
      ))}
    </OrderContainer>
  );
}
export default Order;
