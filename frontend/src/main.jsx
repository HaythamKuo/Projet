import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import MainWrapper from "./mainWrapper.jsx";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <MainWrapper />
  </StrictMode>
);
