import { createSlice, current } from "@reduxjs/toolkit";
import { addGoods } from "../thunks/addGoods";
import { fetchGoods } from "../thunks/fetchGoods";
import { deleteGood } from "../thunks/deleteGood";
import { logout } from "./authSlice";

const initialState = {
  items: [],
  isLoading: false,
  isOpen: false,
  error: null,
};

export const selectCartItems = (state) =>
  Array.isArray(state.cart.items?.items) ? state.cart.items.items : [];

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
    removeItem: (state, action) => {
      //console.log("state.items: " + JSON.stringify(current(state.items)));
      //console.log("action.payload: " + JSON.stringify(current(action.payload)));
      //console.log(action.payload);

      state.items.items = state.items?.items.filter(
        (item) => item.productId._id !== action.payload
      );
    },
    //roll back
    restoreItem: (state, action) => {
      const exists = state.items.find(
        (item) => item.productId._id === action.payload._id
      );

      if (!exists) state.items.push(action.payload);
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchGoods.pending, (state) => {
      state.isLoading = true;
      state.error = null;
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

    //delete something
    builder.addCase(deleteGood.pending, (state) => {
      state.isLoading = true;
      state.error = null;
    });
    builder.addCase(deleteGood.fulfilled, (state, action) => {
      console.log(action.payload);

      state.isLoading = false;
      state.items = action.payload.items ?? action.payload;
    });
    builder.addCase(deleteGood.rejected, (state, action) => {
      state.isLoading = false;
      state.error =
        action.payload || action.error?.message || "無法刪除購物車內的產品";
    });

    //登出
    builder.addCase(logout, (state) => {
      state.items = [];
      state.isLoading = false;
      state.isOpen = false;
      state.error = null;
    });
  },
});

export const { openCart, closeCart, toggleCart, removeItem, restoreItem } =
  cartSlice.actions;
export default cartSlice.reducer;
