import { useNavigate } from "react-router-dom";
import FormField from "../components/FormField";
import { OptText, Container, FormContainer } from "../styles/form.style";

function RegisterPage() {
  const navigate = useNavigate();

  function handleFormData(e) {
    e.preventDefault();

    const data = new FormData(e.target);
    const fd = Object.fromEntries(data);
    console.log(fd);

    //e.target.reset() ← 另一種重置表單的方法
  }

  return (
    <Container>
      <h1>註冊你的帳戶</h1>

      <FormContainer onSubmit={handleFormData} key={"register"}>
        <FormField
          label="用戶名稱"
          type="text"
          name="name"
          placeholder="限制"
          maxLength={10}
          minLength={3}
        />
        <FormField
          label="電子郵件"
          type="email"
          name="email"
          placeholder="限制"
        />
        <FormField
          label="密碼"
          type="password"
          name="password"
          placeholder="限制"
          maxLength={15}
          minLength={6}
        />
        <FormField
          label="再次輸入密碼"
          type="password"
          name="accuratePassword"
          placeholder="限制"
          maxLength={15}
          minLength={6}
        />

        <button>註冊</button>
        <OptText onClick={() => navigate(-1)}>已經有帳號了？</OptText>
      </FormContainer>
    </Container>
  );
}
export default RegisterPage;
