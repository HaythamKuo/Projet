// import { useRef, useState } from "react";
// import { toast } from "react-toastify";
// import FormField from "../components/FormField";
// import { useUploadProdsMutation } from "../store/apis/prodApiSlice";

// function CreateProd() {
//   const [uploadProds, { isLoading }] = useUploadProdsMutation();

//   async function handleProd(e) {
//     e.preventDefault();

//     const form = e.target;
//     const data = new FormData(form);

//     console.log(data);

//     try {
//       await uploadProds(data).unwrap();
//       toast.success("上傳成功");
//     } catch (error) {
//       toast.error(error?.data?.message || error?.error);
//     }
//   }

//   return (
//     <form onSubmit={handleProd}>
//       <FormField label="產品名稱" type="text" name="name" />
//       <FormField label="價錢" type="text" name="price" />
//       <FormField label="描述" type="text" name="description" />
//       <FormField label="星星" type="text" name="rate" />
//       <FormField label="照片" type="file" name="images" accept="image/*" />

//       <button type="submit">送出</button>
//       {isLoading && <p>創建中...</p>}
//     </form>
//   );
// }
// export default CreateProd;
