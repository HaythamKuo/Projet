//驗證用戶名稱
export const validateUserName = (name) =>
  name.trim().length >= 2 && name.trim().length <= 10;

export const validateMail = (email) => /^\S+@\S+\.\S+$/.test(email.trim());

export const validPassword = (pw) =>
  typeof pw === "string" && pw.length >= 6 && pw.length <= 15;

const validateCore = (data) => {
  const errs = [];
  const originSize = ["S", "M", "L"];
  const { name, price, description, size, category, subCategory } = data;
  const sizeStocks = Object.values(size);

  if (!name || name.length < 2 || name.length > 15)
    errs.push("請填寫產品名稱且字元長度不應小於2, 或是大於15");
  if (isNaN(price) || price < 0) errs.push("請輸入正確的價格");
  if (!description || description.length < 2 || description.length > 50)
    errs.push("請輸入描述且字元長度不應小於2, 大於50");

  if (sizeStocks.some((stock) => stock <= 0))
    errs.push("尺寸庫存數量必須大於0");

  const entries = originSize.map((size, index) => [size, sizeStocks[index]]);
  const cleanStock = Object.fromEntries(entries);

  if (!category && !subCategory) errs.push("請選擇商品種類");

  const cleanValue = { name, price, description, cleanStock };

  return {
    errs,
    cleanValue,
  };
};

export const validateForm = (formData, img, size, category, subCategory) => {
  const name = formData.get("name").trim();
  const price = +formData.get("price");
  const description = formData.get("description").trim();
  const rate = +formData.get("rate");

  //如果有錯誤就推入errs
  const data = { name, price, description, size, category, subCategory };

  const { errs, cleanValue } = validateCore(data);

  if (isNaN(rate) || rate < 1 || rate > 5) errs.push("星等需在 1 到 5 之間");

  if (img.length === 0 || img.length > 3)
    errs.push("請上傳圖片且不能一次上傳3張");

  //回傳一個物件

  return {
    isValid: errs.length === 0,
    errs,
    cleanValue: { ...cleanValue, rate },
  };
};

export const validateEditForm = (
  form,
  category,
  subCategory,
  size,
  oldImg = [],
  newImg = []
) => {
  const name = form.get("name").trim();
  const price = +form.get("price");
  const description = form.get("description").trim();

  const data = { name, price, description, size, category, subCategory };

  const { errs, cleanValue } = validateCore(data);

  const totalImages = (oldImg?.length || 0) + (newImg?.length || 0);
  if (totalImages === 0 || totalImages > 3) {
    errs.push("請至少上傳 1 張圖片，且最多不可超過 3 張");
  }

  return {
    isValid: errs.length === 0,
    errs,

    cleanValue: { ...cleanValue, oldImg, newImg },
  };
};
