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
    updateAddress: (state, action) => {
      state.userInfo.address = action.payload;
    },
    logout: (state) => {
      state.userInfo = null;
    },
  },
});

export const { setCredentials, logout, updateAddress } = authSlice.actions;
export default authSlice.reducer;
