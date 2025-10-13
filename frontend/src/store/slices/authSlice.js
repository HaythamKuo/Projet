import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  userInfo: null,
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
