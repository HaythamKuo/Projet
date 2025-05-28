import { useState } from "react";
import { useNavigate } from "react-router-dom";
import FormField from "../components/FormField";
import { OptText, Container, FormContainer } from "../styles/form.style";
import {
  validPassword,
  validateMail,
  validateUserName,
} from "../utils/validation";

function RegisterPage() {
  const navigate = useNavigate();

  const [errs, setErrs] = useState({
    userName: "",
    email: "",
    password: "",
    accPassword: "",
  });
  //const [acc,setAcc]=useState(false)
  function handleFormData(e) {
    e.preventDefault();

    const data = new FormData(e.target);
    const fd = Object.fromEntries(data);

    const userName = data.get("name")?.trim() || "";
    const email = data.get("email")?.trim() || "";
    const password = data.get("password") || "";
    const accPassword = data.get("accuratePassword") || "";

    const newErrs = { userName: "", email: "", password: "", accPassword: "" };

    if (validateUserName(userName)) {
      newErrs.userName = "暱稱長度要大於兩個字元";
      console.log("validateUserName:", validateUserName(userName));
    }

    if (!validateMail(email)) {
      newErrs.email = "請輸入正確的信箱格式";
    }

    if (!validPassword(password)) {
      newErrs.password = "密碼長度應該大於6個字元且小於15個字元";
    }

    if (password !== accPassword) {
      newErrs.accPassword = "兩次密碼輸入需一致";
    }

    //先轉換成Array 然後用some()遍尋有沒有空字串 如果沒有就代表有錯誤訊息
    const hasErr = Object.values(newErrs).some((e) => e !== "");

    if (hasErr) {
      setErrs(newErrs);
      return;
    }

    console.log(fd);
    setErrs({ userName: "", email: "", password: "", accPassword: "" });

    e.target.reset();
  }

  return (
    <Container>
      <h1>註冊你的帳戶</h1>

      <FormContainer onSubmit={handleFormData} key={"register"}>
        <FormField
          label="用戶名稱"
          type="text"
          name="userName"
          placeholder="限制"
          maxLength={10}
          minLength={3}
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
          name="accuratePassword"
          placeholder="限制"
          maxLength={15}
          minLength={6}
          mes={errs.accPassword}
          err={errs.accPassword}
        />

        <button type="submit">註冊</button>
        <OptText onClick={() => navigate(-1)}>已經有帳號了？</OptText>
      </FormContainer>
    </Container>
  );
}
export default RegisterPage;
