import { createSlice } from "@reduxjs/toolkit";
import { addGoods } from "../thunks/addGoods";
import { fetchGoods } from "../thunks/fetchGoods";

const initialState = {
  data: [],
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
      state.data = action.payload;
    });
    builder.addCase(fetchGoods.rejected, (state, action) => {
      state.isLoading = false;
      state.error = action.error;
    });
  },
});

export const { openCart, closeCart, toggleCart } = cartSlice.actions;
export default cartSlice.reducer;
