import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { toast } from "react-toastify";
import { useRegisterMutation } from "../store/apis/apiSlice";
import { setCredentials } from "../store/slices/authSlice";
import FormField from "../components/FormField";
import { OptText, Container, FormContainer } from "../styles/form.style";
import {
  validPassword,
  validateMail,
  validateUserName,
} from "../utils/validation";
import ProcessLoader from "../styles/UI/ProcessLoader";

function RegisterPage() {
  const dispatch = useDispatch();

  const [userRegister, { isLoading }] = useRegisterMutation();

  const navigate = useNavigate();

  const [errs, setErrs] = useState({
    userName: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  async function handleFormData(e) {
    e.preventDefault();

    const data = new FormData(e.target);
    //const fd = Object.fromEntries(data);

    const userName = data.get("userName")?.trim() || "";
    const email = data.get("email")?.trim() || "";
    const password = data.get("password") || "";
    const confirmPassword = data.get("confirmPassword")?.trim() || "";

    const newErrs = {
      userName: "",
      email: "",
      password: "",
      confirmPassword: "",
    };

    if (!validateUserName(userName)) {
      newErrs.userName = "暱稱長度要大於兩個字元";
      //console.log("validateUserName:", validateUserName(userName));
    }

    if (!validateMail(email)) {
      newErrs.email = "請輸入正確的信箱格式";
    }

    if (!validPassword(password)) {
      newErrs.password = "密碼長度應該大於6個字元且小於15個字元";
    }

    if (password !== confirmPassword) {
      newErrs.confirmPassword = "兩次密碼輸入需一致";
    }

    //先轉換成Array 然後用some()遍尋有沒有空字串 如果沒有就代表有錯誤訊息
    const hasErr = Object.values(newErrs).some((e) => e !== "");

    if (hasErr) {
      setErrs(newErrs);
      return;
    }

    //非同步處理註冊資料
    try {
      //跟後端溝通建立資料
      const res = await userRegister({
        name: userName,
        email: email,
        password: password,
      }).unwrap();

      dispatch(setCredentials(res));

      //如果資料有驗證成功 跳出一個Modal來告訴使用者資料已成功串連
      //console.log(res);

      setErrs({ userName: "", email: "", password: "", confirmPassword: "" });
      e.target.reset();
      navigate("/");
      toast.success("註冊成功!!");
    } catch (error) {
      toast.error(error?.data?.message || error.error);
    }
  }

  return (
    <>
      {isLoading && (
        <ProcessLoader />
        // <OverLay>
        //   <Loader $heightlight={1000} />
        // </OverLay>
      )}
      <Container>
        <h1>註冊你的帳戶</h1>

        <FormContainer onSubmit={handleFormData}>
          <FormField
            label="用戶名稱"
            type="text"
            name="userName"
            placeholder="限制"
            maxLength={10}
            minLength={2}
            mes={errs.userName}
            err={errs.userName}
          />
          <FormField
            label="電子郵件"
            type="email"
            name="email"
            placeholder="限制"
            mes={errs.email}
            err={errs.email}
          />
          <FormField
            label="密碼"
            type="password"
            name="password"
            placeholder="限制"
            maxLength={15}
            minLength={6}
            mes={errs.password}
            err={errs.password}
          />
          <FormField
            label="再次輸入密碼"
            type="password"
            name="confirmPassword"
            placeholder="限制"
            maxLength={15}
            minLength={6}
            mes={errs.confirmPassword}
            err={errs.confirmPassword}
          />

          <button type="submit" disabled={isLoading}>
            註冊
          </button>
          <OptText onClick={() => navigate("/auth")}>已經有帳號了？</OptText>
        </FormContainer>
      </Container>
    </>
  );
}
export default RegisterPage;
