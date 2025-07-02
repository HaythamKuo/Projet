import { useCallback, useState } from "react";
import { useParams } from "react-router-dom";
import { toast } from "react-toastify";
import {
  useEditMyProdMutation,
  useFetchSpecificProdQuery,
} from "../store/apis/prodApiSlice";
import FormField from "./FormField";
import UploadButton from "../styles/UI/UploadBtn";

function EditProduct() {
  const { prodid } = useParams();

  const [resetUpload, setResetUpload] = useState(false);
  const [isSubmit, setSubmit] = useState(false);
  const [imgs, setImgs] = useState([]);

  const { data, isLoading, isError, error } = useFetchSpecificProdQuery(prodid);
  const [editProd, { isLoading: editting, isError: editErr }] =
    useEditMyProdMutation();

  const obsFile = useCallback((newImg) => setImgs(newImg), []);

  async function handleForm(e) {
    e.preventDefault();
    setSubmit(true);
    const form = new FormData(e.target);

    const oldImg = imgs.filter((item) => item.isOld).map((img) => img.url);

    const newImg = imgs
      .filter((img) => !img.isOld && img.img instanceof File)
      .map((img) => img.img);

    form.append("oldImages", JSON.stringify(oldImg));
    newImg.forEach((e) => form.append("newImages", e));

    try {
      await editProd({ id: data._id, formData: form }).unwrap();
      //console.log(form);

      //toast.success("更新成功");
      setImgs([]);
      setResetUpload(true);
    } catch (error) {
      if (error) {
        console.log(error?.error?.message || error.error);
        toast.error("更新失敗");
      }
    } finally {
      setSubmit(false);
    }
  }

  if (isLoading) return <p>載入中</p>;
  if (isError) return <p>{error?.data?.message || "發生了一些錯誤"}</p>;

  //console.log("這裡是data.images: " + data.images);

  return (
    <form onSubmit={handleForm}>
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
    </form>
  );
}
export default EditProduct;
