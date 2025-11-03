import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  userInfo: null,
  isLoading: true,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setCredentials: (state, action) => {
      state.userInfo = action.payload;
      state.isLoading = false;
    },
    updateAddress: (state, action) => {
      state.userInfo.address = action.payload;
    },
    logout: (state) => {
      state.userInfo = null;
      state.isLoading = false;
    },
    setLoadingFalse: (state) => {
      state.isLoading = false;
    },
  },
});

export const { setCredentials, logout, updateAddress, setLoadingFalse } =
  authSlice.actions;
export default authSlice.reducer;
