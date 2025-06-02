import { createSlice } from "@reduxjs/toolkit";

// const raw = localStorage.getItem("userInfo") ?? "{}";
// const initialState = {
//   // raw 始终是个 JSON 字符串（要么是真实数据，要么就是 "{}"）
//   userInfo: JSON.parse(raw),
// };

const initialState = localStorage.getItem("userInfo")
  ? JSON.parse(localStorage.getItem("userInfo"))
  : {};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setCredentials: (state, action) => {
      state.userInfo = action.payload;
      localStorage.setItem("userInfo", JSON.stringify(action.payload));
    },
    logout: (state) => {
      //state.userInfo = {};
      state.userInfo = null;
      localStorage.removeItem("userInfo");
    },
  },
});

export const { setCredentials, logout } = authSlice.actions;
export default authSlice.reducer;
