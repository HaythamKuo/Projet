import { createSlice } from "@reduxjs/toolkit";

// const storeUserString = localStorage.getItem("userInfo");
// const storeUser = storeUserString
//   ? JSON.parse(localStorage.getItem("userInfo"))
//   : null;

const initialState = {
  userInfo: null,
  //isAuthorized: false,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setCredentials: (state, action) => {
      state.userInfo = action.payload;
      // state.isAuthorized = true;
    },
    logout: (state) => {
      state.userInfo = null;
    },
  },
});

export const { setCredentials, logout } = authSlice.actions;
export default authSlice.reducer;
