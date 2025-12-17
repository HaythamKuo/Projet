import { useState } from "react";
import { useDispatch } from "react-redux";
import { useLocation, useNavigate } from "react-router-dom";
import FormField from "../components/FormField";
import {
  Container,
  Divider,
  FormContainer,
  OptText,
  Google,
  ThirdBox,
} from "../styles/form.style";

import { useLoginMutation } from "../store/apis/apiSlice";
import { setCredentials } from "../store/slices/authSlice";
import { toast } from "react-toastify";
import ProcessLoader from "../styles/UI/ProcessLoader";

import { LineIcon } from "../styles/Checkout.style";

function LoginPage() {
  const navigate = useNavigate();
  const location = useLocation();
  const dispatch = useDispatch();
  const [login, { isLoading }] = useLoginMutation();

  // 要進到需授權的頁面會跳轉至登入
  const from =
    location.state?.from?.pathname + (location.state?.from?.search || "/") ||
    "/";

  const [enterValue, setEnterValue] = useState({ email: "", password: "" });

  const [touched, setTouched] = useState({
    email: false,
    password: false,
  });

  const emailHasError = touched.email && !enterValue.email.includes("@");
  const passwordHasError =
    touched.password &&
    (enterValue.password.length < 6 || enterValue.password.length > 15);

  //非同步登入處理

  // const { userInfo } = useSelector((state) => state.auth);

  //處理登入function與拋出錯誤
  async function handleSubmit(e) {
    e.preventDefault();

    if (emailHasError || passwordHasError) return;
    try {
      const res = await login({
        email: enterValue.email,
        password: enterValue.password,
      }).unwrap();

      dispatch(setCredentials(res));
      setEnterValue({ email: "", password: "" });
      setTouched({ email: false, password: false });
      toast.success("登入成功!");
      navigate(from, { replace: true });
    } catch (error) {
      toast.error(error?.data?.message || error.error);
    }
  }

  function handleValue(identifier, e) {
    setEnterValue((preValue) => ({
      ...preValue,
      [identifier]: e.target.value,
    }));

    setTouched((preValue) => ({ ...preValue, [identifier]: false }));
  }

  function handleBlurValue(identifier) {
    setTouched((preValue) => ({
      ...preValue,
      [identifier]: true,
    }));
  }

  return (
    <>
      {isLoading && <ProcessLoader />}

      <Container>
        <h1>登入你的帳戶</h1>

        <FormContainer onSubmit={handleSubmit} key={"login"}>
          <FormField
            label="電子郵件"
            type="email"
            name="email"
            placeholder="替代文字"
            value={enterValue.email}
            onChange={(e) => handleValue("email", e)}
            onBlur={() => handleBlurValue("email")}
            mes="錯誤郵件"
            err={emailHasError}
            width="20rem"
          />

          <FormField
            label="密碼"
            type="password"
            name="password"
            placeholder="替代文字"
            value={enterValue.password}
            onChange={(e) => handleValue("password", e)}
            onBlur={() => handleBlurValue("password")}
            maxLength={15}
            minLength={6}
            mes="錯誤密碼"
            err={passwordHasError}
            width="20rem"
          />

          <button>登入</button>

          <OptText to="register">沒有帳號嗎？立刻註冊</OptText>
        </FormContainer>
        <Divider>或是選擇</Divider>
        <ThirdBox>
          {import.meta.env.DEV ? (
            <a href="http://localhost:5001/api/google/auth/google">
              <Google />
            </a>
          ) : (
            <a href="https://dollserver.zeabur.app/api/google/auth/google">
              <Google />
            </a>
          )}

          {import.meta.env.DEV ? (
            <a href="http://localhost:5001/api/line/lineauth">
              <LineIcon size="2.2rem" />
            </a>
          ) : (
            <a href="https://dollserver.zeabur.app/api/line/lineauth">
              <LineIcon size="2.2rem" />
            </a>
          )}
        </ThirdBox>
      </Container>
    </>
  );
}
export default LoginPage;
