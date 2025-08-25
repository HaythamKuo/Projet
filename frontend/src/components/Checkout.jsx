import { useRef, useState } from "react";
import { toast } from "react-toastify";
import {
  CheckoutContainer,
  RightContainer,
  LeftContainer,
  PickupBlock,
  DeliverCard,
  Top,
  Bottom,
  DeliverTitle,
  EditAddress,
} from "../styles/Checkout.style";
import { SubmitBtn, CancelBtn } from "../styles/ProdImgGallery.style";
import Modal from "./Modal";
import FormField from "./FormField";
import { useChangeAddressMutation } from "../store/apis/apiSlice";
function Checkout() {
  const dialogRef = useRef();

  const [isOpen, setIsOpen] = useState(false);
  const [address, setAddress] = useState("");

  const [saveAddress, { isLoading, isSuccess, isError }] =
    useChangeAddressMutation();

  function showModal() {
    if (dialogRef.current && !dialogRef.current.open) {
      setIsOpen(true);
    }
  }

  async function hanldeAddress() {
    try {
      const res = await saveAddress({ address }).unwrap();
      toast.success(res);
    } catch (error) {
      console.log(error?.data?.message || "儲存失敗");
      toast.error(error?.data?.message || "儲存失敗");
    }
  }

  return (
    <CheckoutContainer>
      <Modal
        ref={dialogRef}
        isOpen={isOpen}
        onClose={() => setIsOpen(false)}
        height="500px"
        width="600px"
      >
        <FormField
          label="請編輯你的取貨地址"
          onChange={(e) => setAddress(e.target.value)}
          $isCenter
        />

        {/* 暫定樣式 */}
        <div
          style={{
            display: "flex",
            gap: "5rem",
          }}
        >
          <SubmitBtn onClick={() => hanldeAddress(address)}>儲存</SubmitBtn>
          <CancelBtn onClick={() => setIsOpen(false)}>取消</CancelBtn>
        </div>
      </Modal>
      <LeftContainer>
        <PickupBlock>
          <DeliverCard>
            <Top>
              <span>取貨地點</span>
              <EditAddress onClick={() => showModal()} />
            </Top>

            <p>台南市 西港區永樂里86號</p>
          </DeliverCard>
        </PickupBlock>
      </LeftContainer>

      <RightContainer>
        right Lorem ipsum dolor sit amet consectetur adipisicing elit. Quo
        tempore aliquam velit saepe, necessitatibus excepturi corporis
        blanditiis reiciendis, libero, ipsa labore nostrum quasi doloribus
        accusantium nulla! Totam maiores perferendis nihil quas? Explicabo omnis
        vitae similique est cumque quis voluptate recusandae iure tempora lor
      </RightContainer>
    </CheckoutContainer>
  );
}
export default Checkout;
