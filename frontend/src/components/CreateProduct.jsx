import { useState } from "react";
import { toast } from "react-toastify";
import { useUploadProdsMutation } from "../store/apis/prodApiSlice";
import UploadButton from "../styles/UI/UploadBtn";
import FormField from "./FormField";
import { OverLay } from "../styles/CartDrawer.style";
import Loader from "../styles/UI/Loader";
import { validateForm } from "../utils/validation";
import { FormContainer, FormBtn } from "../styles/createProduct.style";
import SplitText from "./reactBit/SplitText";
import SelectOption from "./SelectOption";

function CreateProduct() {
  const [imgs, setImg] = useState([]);
  const [imgReset, setimgReset] = useState(false);
  const [category, setCategory] = useState("");
  const [subCategory, setSubCategory] = useState("");

  const [createProd, { isLoading }] = useUploadProdsMutation();

  //const handleImg = (files) => setImg((pre) => [...pre, ...files]);

  const handleImg = (file) => {
    const newImgs = file.filter(
      (item) => !item.isOld && item.img instanceof File
    );
    setImg(newImgs);
  };

  //setImg(files);
  async function handleForm(e) {
    e.preventDefault();

    const res = new FormData(e.target);

    const { isValid, errs, cleanValue } = validateForm(res, imgs);

    if (!isValid) {
      errs.forEach((e) => toast.error(e));
      return;
    }

    const payload = new FormData();
    payload.append("name", cleanValue.name);
    payload.append("price", cleanValue.price);
    payload.append("description", cleanValue.description);
    payload.append("rate", cleanValue.rate);
    payload.append("mainCategory", category);
    payload.append("subCategory", subCategory);

    if (imgs) {
      imgs.forEach((img) => payload.append("images", img.img));
    }

    //console.log(payload);

    try {
      await createProd(payload).unwrap();

      //toast.success("創建成功");
      e.target.reset();
      setimgReset(true);
      setTimeout(() => setimgReset(false), 1000);
      setImg([]);
      setCategory("");
    } catch (error) {
      toast.error(error?.data?.message || error?.error);
    }
  }

  return (
    <>
      {isLoading && (
        <OverLay>
          <Loader $heightlight={1000} />
        </OverLay>
      )}

      <FormContainer onSubmit={handleForm}>
        <SplitText text="創建你的娃娃" customStyles="font-size: 3rem;" />
        <FormField label="產品名稱" type="text" name="name" />
        <FormField label="價錢" type="text" name="price" />
        <FormField label="描述" type="text" name="description" />
        <FormField label="星星" type="text" name="rate" />
        <SelectOption
          category={category}
          subCategory={subCategory}
          setCategory={setCategory}
          setSubCategory={setSubCategory}
        />
        <UploadButton onFileSelect={handleImg} reset={imgReset} />
        <FormBtn type="submit">送出</FormBtn>
      </FormContainer>
    </>
  );
}
export default CreateProduct;
