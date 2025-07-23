import { useEffect, useCallback, useState } from "react";
import { useParams } from "react-router-dom";
import { toast } from "react-toastify";
import {
  useEditMyProdMutation,
  useFetchSpecificProdQuery,
} from "../store/apis/prodApiSlice";
import { EditContainer, EditForm } from "../styles/editForm.style";
import FormField from "./FormField";
import SelectOption from "./SelectOption";
import UploadButton from "../styles/UI/UploadBtn";
import ProdSize from "./ProdSize";
import { validateEditForm } from "../utils/validation";

function EditProduct() {
  const { prodid } = useParams();

  const [category, setCategory] = useState(null);
  const [subCategory, setSubCategory] = useState(null);
  const [size, setSize] = useState({
    S: 0,
    M: 0,
    L: 0,
  });

  const [resetUpload, setResetUpload] = useState(false);
  const [isSubmit, setSubmit] = useState(false);
  const [imgs, setImgs] = useState([]);

  const { data, isLoading, isSuccess, isError, error } =
    useFetchSpecificProdQuery(prodid);
  const [editProd, { isLoading: editting, isError: editErr }] =
    useEditMyProdMutation();

  const obsFile = useCallback((newImg) => setImgs(newImg), []);

  async function handleForm(e) {
    e.preventDefault();

    const form = new FormData(e.target);

    const oldImg = imgs.filter((item) => item.isOld).map((img) => img.url);

    const newImg = imgs
      .filter((img) => !img.isOld && img.img instanceof File)
      .map((img) => img.img);

    const { isValid, errs, cleanValue } = validateEditForm(
      form,
      category,
      subCategory,
      size,
      oldImg || [],
      newImg || []
    );

    if (!isValid) {
      errs.forEach((e) => toast.error(e));
      setSubmit(false);
      return;
    }

    setSubmit(true);
    //console.log(cleanValue);
    //setSubmit(true);

    const payload = new FormData();

    payload.append("name", cleanValue.name);
    payload.append("price", cleanValue.price);
    payload.append("description", cleanValue.description);
    payload.append("mainCategory", category);
    payload.append("subCategory", subCategory);

    //尚未完成size的驗證
    payload.append("size", JSON.stringify(cleanValue.cleanStock));
    payload.append("oldImages", JSON.stringify(cleanValue.oldImg));

    if (Array.isArray(cleanValue.newImg)) {
      cleanValue.newImg.forEach((file) => payload.append("newImages", file));
    }

    // newImg.forEach((e) => form.append("newImages", e));

    try {
      await editProd({ id: data._id, formData: payload }).unwrap();
      //console.log(payload);

      //toast.success("更新成功");
      setImgs([]);
      setResetUpload(true);
    } catch (error) {
      if (error) {
        console.log(error?.error?.message || error?.data?.message);
        toast.error(error?.error);
      }
    } finally {
      setSubmit(false);
    }
  }

  useEffect(() => {
    if (isSuccess && data) {
      setCategory(data.mainCategory);
      setSubCategory(data.subCategory);
      setSize(data.size);
    }
  }, [data, isSuccess]);

  if (isLoading) return <p>載入中</p>;
  if (isError) return <p>{error?.data?.message || "發生了一些錯誤"}</p>;

  return (
    <EditForm onSubmit={handleForm}>
      <span>產品id: {data._id}</span>
      <FormField
        label="產品名稱"
        type="text"
        name="name"
        defaultValue={data.name}
      />
      <FormField
        label="價錢"
        type="text"
        name="price"
        defaultValue={data.price}
      />
      <FormField
        label="描述"
        type="text"
        name="description"
        defaultValue={data.description}
      />
      <SelectOption
        category={category}
        setCategory={setCategory}
        subCategory={subCategory}
        setSubCategory={setSubCategory}
      />
      <ProdSize size={size} setSize={setSize} />
      <UploadButton
        existingImgs={data?.images}
        //onFileSelect={(newFiles) => setImgs((pre) => [...pre, ...newFiles])}
        //onFileSelect={(newImgs) => setImgs(newImgs)}
        onFileSelect={obsFile}
        reset={resetUpload}
        onResetFinished={() => setResetUpload(false)}
      />
      <button type="submit" disabled={isSubmit}>
        {isSubmit ? "處理中" : "送出"}
      </button>
    </EditForm>
  );
}
export default EditProduct;
