import styled from "styled-components";

//隨機產生字串
// const generateRandomStr = (length) =>
//   Math.random()
//     .toString(36)
//     .substring(2, length + 2);
// const scope = "profile openid email";

const StyledLineButton = styled.button`
  background-color: #06c755;
  color: white;
  border: none;
  padding: 10px 20px;
  border-radius: 6px;
  cursor: pointer;
  font-size: 16px;
  transition: background-color 0.3s;

  &:hover {
    background-color: #05ae4a;
  }
`;

function LineLoginConfig() {
  // const [strings, setStrings] = useState("");

  // 需使用encodeURIComponent改寫
  // const lintStr = new URLSearchParams({
  //   response_type: "code",
  //   client_id: LINE_CLIENT_ID,
  //   redirect_uri: "http://localhost:5173/callback",
  //   state: STATE,
  //   // nonce,
  //   scope: "email openid profile",
  // }).toString();

  const handleLogin = () => {
    // const finalUrl = `https://access.line.me/oauth2/v2.1/authorize?${lintStr}`;
    // setStrings(finalUrl);

    window.location.href = "http://localhost:5001/api/line/lineauth";
  };

  // console.log(strings);

  return <StyledLineButton onClick={handleLogin}>Line</StyledLineButton>;
}
export default LineLoginConfig;
