import { createSlice } from "@reduxjs/toolkit";
import { addGoods } from "../thunks/addGoods";
import { fetchGoods } from "../thunks/fetchGoods";
import { deleteGood } from "../thunks/deleteGood";
import { logout } from "./authSlice";

const initialState = {
  cart: {
    _id: null,
    userId: null,
    items: [],
    totalPrice: 0,
  },
  isLoading: false,
  isOpen: false,
  error: null,
};

export const selectCartItems = (state) =>
  Array.isArray(state.cart.cart.items) ? state.cart.cart.items : [];

export const cartTotalPrice = (state) =>
  state.cart.cart.items.reduce((sum, item) => {
    const size = item.selectedSizes || {};
    const qty = size.S || 0 + size.M || 0 + size.L || 0;
    return sum + qty * item.unitPrice;
  }, 0);

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
      state.cart.items = state.cart.items.filter(
        (item) => item._id !== action.payload
      );
    },
    restoreItem: (state, action) => {
      const exists = state.cart.items.find(
        (item) => item._id === action.payload._id
      );
      if (!exists) {
        state.cart.items.push(action.payload);
      }
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchGoods.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(fetchGoods.fulfilled, (state, action) => {
        state.isLoading = false;

        state.cart = action.payload;
      })
      .addCase(fetchGoods.rejected, (state, action) => {
        state.isLoading = false;
        state.error =
          action.payload || action.error?.message || "無法取得購物車內的資料";
      })

      .addCase(addGoods.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(addGoods.fulfilled, (state, action) => {
        state.isLoading = false;

        state.cart = action.payload;
      })
      .addCase(addGoods.rejected, (state, action) => {
        state.isLoading = false;
        state.error =
          action.payload || action.error?.message || "加入購物車失敗";
      })

      // 刪除購物車內商品
      .addCase(deleteGood.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(deleteGood.fulfilled, (state, action) => {
        state.isLoading = false;

        // if (action.payload) {
        //   state.cart.items = action.payload.items;
        //   state.cart.totalPrice = action.payload.totalPrice;
        // }
      })
      .addCase(deleteGood.rejected, (state, action) => {
        state.isLoading = false;
        state.error =
          action.payload || action.error?.message || "刪除購物車產品失敗";
      })

      .addCase(logout, (state) => {
        state.cart = {
          _id: null,
          userId: null,
          items: [],
          totalPrice: 0,
        };
        state.isLoading = false;
        state.isOpen = false;
        state.error = null;
      });
  },
});

export const { openCart, closeCart, toggleCart, removeItem, restoreItem } =
  cartSlice.actions;

export default cartSlice.reducer;
