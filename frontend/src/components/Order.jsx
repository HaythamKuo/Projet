import { useEffect, useRef, useState, useMemo } from "react";
import { useGetOrderQuery } from "../store/apis/orderAPi";
import { useCreateReviewMutation } from "../store/apis/reviewSlice";
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

  const { data, isLoading } = useGetOrderQuery({
    all: showAll,
    sort: sortOrder,
  });
  const [postReviews] = useCreateReviewMutation();

  const prods = useMemo(
    () => data?.flatMap((item) => item.orderItems) || [],
    [data]
  );

  useEffect(() => {
    if (!isOpen) {
      // 每次關閉都重置
      const reset = {};
      prods.forEach((prod) => {
        reset[prod._id] = { rank: 1, comment: "" };
      });
      setReview(reset);
      setOrderIdentity(null);
      setSubmitAdmission([]);
    }
  }, [isOpen, prods]);
  //為了讓rank預設值為1
  // const initialReview = {};
  // prods.forEach((prod) => {
  //   initialReview[prod._id] = { rank: 1, comment: "" };
  // });
  // const [review, setReview] = useState(initialReview);

  function showModal(id) {
    setOrderIdentity(id);
    setIsOpen(true);
  }

  async function handleReviews(e) {
    e.preventDefault();

    //[prodId,{...}]
    const reviewEntries = Object.entries(review);

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

    // const reviews = reviewEntries.map(([prodId, value]) => {
    //   const rank = value.rank;
    //   const comment = value.comment;

    //   const singleReview = {
    //     prodId,
    //     rank: rank ?? 1,
    //     comment: comment ?? "",
    //   };

    //   return singleReview;
    // });

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

    // setSubmitAdmission((pre) => [
    //   ...pre,
    //   reviews.map((review) => review.prodId),
    // ]);

    setSubmitAdmission((pre) => [
      ...pre,
      ...reviews.map((review) => review.prodId),
    ]);

    //console.log(payload);
    console.log(reviews);

    try {
      const res = await postReviews(payload).unwrap();
      //   console.log(res);
    } catch (error) {
      console.log(error);

      setSubmitAdmission((pre) =>
        pre.filter((id) => !reviews.some((r) => r.prodId === id))
      );
    }
  }

  //const { paymentInfo, orderItems } = data;

  //console.log(prods);
  //console.log(showAll);
  if (isLoading) return <ProcessLoader />;
  if (!data) return <p>沒有訂單</p>;

  return (
    <OrderContainer>
      <Modal
        isOpen={isOpen}
        ref={dialogRef}
        height="100%"
        width="100%"
        onClose={() => setIsOpen(false)}
        minorHeight="750px"
      >
        {/* /<div>{prods.map(prod=>)}</div> */}
        <ModalBox onSubmit={handleReviews}>
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              justifyContent: "center",
              overflowY: "auto",
              background: "yellow",
            }}
          >
            {prods?.map((prod) => (
              <div key={prod._id}>
                <p>{prod.name}</p>
                <ReviewStars
                  disable={submitAdmission.includes(prod._id)}
                  prodId={prod._id}
                  rating={review[prod._id]?.rank || 1}
                  onChange={(newRank) => {
                    setReview((pre) => ({
                      ...pre,
                      [prod._id]: {
                        ...(pre[prod._id] || {}),
                        rank: newRank,
                      },
                    }));
                  }}
                />
                <ReviewArea
                  name={prod._id}
                  placeholder="字數不得超過20字"
                  disabled={submitAdmission.includes(prod._id)}
                  value={review[prod._id]?.comment || ""}
                  onChange={(e) => {
                    const newComment = e.target.value;
                    setReview((pre) => ({
                      ...pre,
                      [prod._id]: {
                        ...(pre[prod._id] || {}),
                        comment: newComment,
                      },
                    }));
                  }}
                />
              </div>
            ))}
          </div>
          <div style={{ display: "flex", justifyContent: "center" }}>
            <button>確定</button>
            <button type="button" onClick={() => setIsOpen(false)}>
              取消
            </button>
          </div>
        </ModalBox>
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
