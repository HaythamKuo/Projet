import { createSlice } from "@reduxjs/toolkit";

const storeUserString = localStorage.getItem("userInfo");
const storeUser = storeUserString
  ? JSON.parse(localStorage.getItem("userInfo"))
  : null;

const initialState = {
  userInfo: storeUser,
  isAuthorized: Boolean(storeUser),
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setCredentials: (state, action) => {
      state.userInfo = action.payload;
      state.isAuthorized = true;
      localStorage.setItem("userInfo", JSON.stringify(action.payload));
    },
    logout: (state) => {
      state.isAuthorized = false;
      state.userInfo = null;
      localStorage.removeItem("userInfo");
    },

    clearCredential: (state) => {
      state.userInfo = null;
      state.isAuthorized = false;
      localStorage.removeItem("userInfo");
    },
  },
});

export const { setCredentials, clearCredential, logout } = authSlice.actions;
export default authSlice.reducer;
