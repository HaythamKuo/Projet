//驗證用戶名稱
export const validateUserName = (name) =>
  name.trim().length >= 2 && name.trim().length <= 10;

export const validateMail = (email) => /^\S+@\S+\.\S+$/.test(email.trim());

export const validPassword = (pw) =>
  typeof pw === "string" && pw.length >= 6 && pw.length <= 15;
