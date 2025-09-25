import { useRef, useState } from "react";
import { useGetOrderQuery } from "../store/apis/orderAPi";

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

function Order() {
  const dialogRef = useRef();
  const [isOpen, setIsOpen] = useState(false);
  const [showAll, setShowAll] = useState(true);
  const [sortOrder, setSortOrder] = useState("desc");

  const { data, isLoading } = useGetOrderQuery({
    all: showAll,
    sort: sortOrder,
  });

  //console.log(data);

  const prods = data?.flatMap((item) => item.orderItems) || [];

  //為了讓rank預設值為1
  const initialReview = {};
  prods.forEach((prod) => {
    initialReview[prod._id] = { rank: 1, comment: "" };
  });
  const [review, setReview] = useState(initialReview);

  if (isLoading) return <ProcessLoader />;
  if (!data) return <p>沒有訂單</p>;

  function showModal() {
    setIsOpen(true);
  }

  function handleReviews(e) {
    e.preventDefault();
    console.log(review);
  }

  //const { paymentInfo, orderItems } = data;

  //console.log(prods);
  //console.log(showAll);

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
            <button onClick={() => setIsOpen(false)}>取消</button>
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
            <RankBtn onClick={() => showModal()}>給予評價</RankBtn>
          </Right>
        </OrderBlock>
      ))}
    </OrderContainer>
  );
}
export default Order;
