import { createSlice } from "@reduxjs/toolkit";
import { addGoods } from "../thunks/addGoods";
import { fetchGoods } from "../thunks/fetchGoods";

const initialState = {
  items: [],
  isLoading: false,
  isOpen: false,
  error: null,
};

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    openCart: (state) => {
      state.isOpen = true;
    },
    closeCart: (state) => {
      state.isOpen = false;
    },
    toggleCart: (state) => {
      state.isOpen = !state.isOpen;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchGoods.pending, (state, action) => {
      state.isLoading = true;
    });
    builder.addCase(fetchGoods.fulfilled, (state, action) => {
      state.isLoading = false;
      state.items = action.payload;
    });
    builder.addCase(fetchGoods.rejected, (state, action) => {
      state.isLoading = false;
      state.error =
        action.payload || action.error?.message || "無法取得購物車內的資料";
    });
  },
});

export const { openCart, closeCart, toggleCart } = cartSlice.actions;
export default cartSlice.reducer;
