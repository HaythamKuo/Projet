import { useState } from "react";

import { toast } from "react-toastify";

const initialSize = {
  S: 0,
  M: 0,
  L: 0,
};

export function useProdForm({ initData = {}, validator, mode, mutation }) {
  const [imgs, setImgs] = useState(initData.imgs || []);
  const [category, setCategory] = useState(initData.mainCategory || "");
  const [subCategory, setSubCategory] = useState(initData.subCategory || "");
  const [size, setSize] = useState(initData.size || initialSize);

  const [isSubmitting, setIsSubmitting] = useState(false);

  // 控制圖片上傳元件重置
  const [resetUpload, setResetUpload] = useState(false);

  async function handleSubmit(e) {
    e.preventDefault();

    const rawData = new FormData(e.target);

    let resultData;

    if (mode === "creator") {
      resultData = validator(rawData, imgs, category, subCategory, size);
    } else {
      const oldImgs = imgs.filter((item) => item.isOld).map((item) => item.url);
      const newImgs = imgs
        .filter((item) => !item.isOld && item.img instanceof File)
        .map((item) => item.img);

      resultData = validator(
        rawData,
        category,
        subCategory,
        size,
        oldImgs || [],
        newImgs || [],
      );
    }

    const { isValid, errs, cleanValue } = resultData;

    if (!isValid) {
      errs.forEach((e) => toast.error(e));
      setIsSubmitting(false);
      return;
    }

    //重新組裝
    const payload = new FormData();
    payload.append("name", cleanValue.name);
    payload.append("price", cleanValue.price);
    payload.append("description", cleanValue.description);
    payload.append("mainCategory", category);
    payload.append("subCategory", subCategory);
    payload.append("size", JSON.stringify(cleanValue.cleanStock));
    if (cleanValue.rate) payload.append("rate", cleanValue.rate);

    // 依據 mode 不同 組裝圖片
    if (mode === "create") {
      if (imgs) {
        imgs.forEach((img) => payload.append("images", img.img));
      }
    } else {
      payload.append("oldImages", JSON.stringify(cleanValue.oldImg));

      if (Array.isArray(cleanValue.newImg)) {
        cleanValue.newImg.forEach((img) => payload.append("newImages", img));
      }
    }

    // API 請求, 依據 mode 發出不同請求
    try {
      if (mode === "create") {
        await mutation(payload).unwrap();

        toast.success("創建成功");
        e.target.reset();
        resetState();
      } else {
        await mutation({ id: initData._id, formData: payload }).unwrap();
        setImgs([]);
        setResetUpload(true);
        setTimeout(() => setResetUpload(false), 500);
      }
    } catch (error) {
      const errorMsg = error?.data?.message || error?.error || "發生錯誤";
      console.error(error);
      toast.error(errorMsg);
    } finally {
      setIsSubmitting(false);
    }
  }

  const resetState = () => {
    setImgs([]);
    setCategory("");
    setSubCategory("");
    setSize(initialSize);
    setResetUpload(true);
    setTimeout(() => setResetUpload(false), 1000);
  };

  return {
    imgs,
    setImgs,
    category,
    setCategory,
    subCategory,
    setSubCategory,
    size,
    setSize,
    isSubmitting,
    resetUpload,
    handleSubmit,
    resetState,
  };
}
