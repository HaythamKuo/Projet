const google = {
  type: "code",
  client: 123,
  url: "http://localhost:5001/google",
};

const line = {
  ...google,
  url: "http://localhost:5001/line",
};

const one = new URLSearchParams(google).toString();
const two = new URLSearchParams(line).toString();

console.log(two);
