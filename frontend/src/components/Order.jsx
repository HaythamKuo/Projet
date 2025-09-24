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
} from "../styles/order.style";
import ProcessLoader from "../styles/UI/ProcessLoader";
function Order() {
  const { data, isLoading } = useGetOrderQuery();
  if (isLoading) return <ProcessLoader />;
  if (!data) return <p>沒有訂單</p>;

  const { paymentInfo, orderItems } = data;

  console.log(data);

  return (
    <OrderContainer>
      <OrderBlock>
        <Left>
          <OrderTop>
            <OrderStatus>
              {data?.status === "paid" ? "已送達" : "運輸中"}
            </OrderStatus>
            <OrderDate> 送達日期 {data?.createdAtFormatted} </OrderDate>
          </OrderTop>
          {orderItems.map((item) => (
            <OrderItems key={item._id}>
              <ImgWrapper>
                <TestImg alt="hahaha" />
              </ImgWrapper>

              <OrderRight>
                <Prodname>{item.name}</Prodname>
                <Quantity>數量： {item.quantity}</Quantity>
                <RankBtn>給予評價</RankBtn>
              </OrderRight>
            </OrderItems>
          ))}
          {/* <OrderItems>
            <ImgWrapper>
              <TestImg alt="hahaha" />
            </ImgWrapper>

            <OrderRight>
              <Prodname>Natural Factors, 檸檬酸鈣，350毫克，90片 </Prodname>
              <Quantity>2</Quantity>
              <RankBtn>給予評價</RankBtn>
            </OrderRight>
          </OrderItems> */}
        </Left>
        <Right>
          <OrderId>訂單編號: #{paymentInfo.merchantTradeNo}</OrderId>
          <OrderTotal>總額: ${data.totalPrice}</OrderTotal>
          <RankBtn>給予評價</RankBtn>
        </Right>
      </OrderBlock>
    </OrderContainer>
  );
}
export default Order;
