import { createSlice } from "@reduxjs/toolkit";
import { addGoods } from "../thunks/addGoods";
import { fetchGoods } from "../thunks/fetchGoods";

const initialState = {
  data: [],
  isLoading: false,
  error: null,
};

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {},
  extraReducers: (builder) => {},
});

export default cartSlice.reducer;
