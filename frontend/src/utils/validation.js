//驗證用戶名稱
export const validateUserName = (name) =>
  name.trim().length >= 2 && name.trim().length <= 10;

export const validateMail = (email) => /^\S+@\S+\.\S+$/.test(email.trim());

export const validPassword = (pw) =>
  typeof pw === "string" && pw.length >= 6 && pw.length <= 15;

export const validateForm = (formData, img) => {
  const errs = [];

  //驗證各個輸入

  const name = formData.get("name").trim();
  const price = +formData.get("price");
  const description = formData.get("description").trim();
  const rate = +formData.get("rate");

  //如果有錯誤就推入errs

  if (!name || name.length < 2 || name.length > 10)
    errs.push("請填寫產品名稱且字元長度不應小於2, 或是大於15");
  if (isNaN(price) || price < 0) errs.push("請輸入正確的價格");
  if (!description || description.length < 2 || description.length > 50)
    errs.push("請輸入描述且字元長度不應小於2, 大於50");
  if (isNaN(rate) || rate < 1 || rate > 5) errs.push("星等需在 1 到 5 之間");

  if (img.length === 0 || img.length > 3)
    errs.push("請上傳圖片且不能一次上傳3張");

  //回傳一個物件

  return {
    isValid: errs.length === 0,
    errs,
    cleanValue: {
      name,
      price,
      description,
      rate,
    },
  };
};
