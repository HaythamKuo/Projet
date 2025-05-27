import { useState } from "react";
import { Link } from "react-router-dom";
import FormField from "../components/FormField";
import { Container, FormContainer, OptText } from "../styles/form.style";

function LoginPage() {
  const [enterValue, setEnterValue] = useState({ email: "", password: "" });

  const [valueIsInvalid, setvalueIsInvalid] = useState({
    email: false,
    password: false,
  });

  const emailHasError = valueIsInvalid.email && !enterValue.email.includes("@");
  const passwordHasError =
    valueIsInvalid.password &&
    (enterValue.password.length < 6 || enterValue.password.length > 15);

  function handleSubmit(e) {
    e.preventDefault();
  }

  function handleValue(identifier, e) {
    setEnterValue((preValue) => ({
      ...preValue,
      [identifier]: e.target.value,
    }));

    setvalueIsInvalid((preValue) => ({ ...preValue, [identifier]: false }));
  }

  function handleBlurValue(identifier) {
    setvalueIsInvalid((preValue) => ({
      ...preValue,
      [identifier]: true,
    }));
  }

  return (
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
        />

        <button>登入</button>
        <Link to="register">
          <OptText>沒有帳號嗎？立刻註冊</OptText>
        </Link>
      </FormContainer>
    </Container>
  );
}
export default LoginPage;
