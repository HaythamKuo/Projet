import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import store from "./store/store.js";
import { Provider } from "react-redux";
import MainWrapper from "./mainWrapper.jsx";

createRoot(document.getElementById("root")).render(
  <Provider store={store}>
    <StrictMode>
      <MainWrapper />
    </StrictMode>
  </Provider>
);
