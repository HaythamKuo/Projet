import { createSlice } from "@reduxjs/toolkit";
import { addGoods, emptiedCart } from "../thunks/addGoods";
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
  hasFetched: false,
  isOpen: false,
  error: null,
};

export const selectCartItems = (state) =>
  Array.isArray(state.cart.cart.items) ? state.cart.cart.items : [];

// export const cartTotalPrice = (state) =>
//   state.cart.cart.items.reduce((sum, item) => {
//     const quantity =
//       item.quantity ??
//       Object.values(item.selectedSizes || {}).reduce(
//         (acc, size) => acc + size,
//         0
//       );
//     return sum + quantity * item.unitPrice;
//   }, 0);

export const cartTotalPrice = (state) => {
  return state.cart.cart.items.reduce(
    (sum, item) => sum + item.quantity * item.unitPrice,
    0
  );
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
    clearCart: () => initialState,

    increaseItem: (state, action) => {
      const { prodid, size } = action.payload;

      const item = state.cart.items.find(
        (prod) => prod.productId._id === prodid
      );

      //console.log(item);

      if (!item || !item.selectedSizes) return;

      if (!item.selectedSizes[size]) {
        item.selectedSizes[size] = 0;
      }

      item.selectedSizes[size]++;
    },
    decreaseItem: (state, action) => {
      const { prodid, size } = action.payload;

      const item = state.cart.items.find(
        (prod) =>
          prod.productId._id === prodid &&
          prod.selectedSizes[size] !== undefined
      );

      if (!item || !item.selectedSizes) return;

      if (!item.selectedSizes[size] || item.selectedSizes[size] <= 0) return;
      //item.selectedSizes[size]--;

      item.selectedSizes[size]--;
      if (item.selectedSizes[size] <= 0) {
        delete item.selectedSizes[size];
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
        state.hasFetched = true;

        Object.assign(state.cart, action.payload);
      })
      .addCase(fetchGoods.rejected, (state, action) => {
        state.isLoading = false;
        state.hasFetched = true;

        state.error =
          action.payload || action.error?.message || "無法取得購物車內的資料";
      })

      //新增至購物車
      .addCase(addGoods.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(addGoods.fulfilled, (state, action) => {
        state.isLoading = false;

        state.cart.items = mergeCart(action.payload.items, state.cart.items);
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

        if (action.payload) {
          Object.assign(state.cart, action.payload);
        }
      })
      .addCase(deleteGood.rejected, (state, action) => {
        state.isLoading = false;
        state.error =
          action.payload || action.error?.message || "刪除購物車產品失敗";
      })

      .addCase(emptiedCart.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(emptiedCart.fulfilled, (state) => {
        state.isLoading = false;

        state.cart.items = [];
        state.cart.totalPrice = 0;
      })
      .addCase(emptiedCart.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      })
      //登出之後將資料清乾淨
      .addCase(logout, (state) => {
        state.cart = { _id: null, userId: null, items: [], totalPrice: 0 };
        state.isLoading = false;
        state.isOpen = false;
        state.error = null;
      });
  },
});

function mergeCart(localItems, remoteItems) {
  const mergeItems = [...localItems];

  remoteItems.forEach((remoteItem) => {
    const index = mergeItems.findIndex(
      (i) => i.productId._id === remoteItem.productId._id
    );

    if (index === -1) {
      mergeItems.push(remoteItem);
      console.log("新的");
    } else {
      //將會被變更
      const localSize = mergeItems[index].selectedSizes || {};
      //現有
      const remoteSize = remoteItem.selectedSizes || {};

      const mergeSize = { ...localSize, ...remoteSize };

      mergeItems[index] = {
        ...mergeItems[index],
        ...remoteItem,
        selectedSizes: mergeSize,
      };
    }
  });

  return mergeItems;
}

export const {
  openCart,
  closeCart,
  toggleCart,
  removeItem,
  restoreItem,
  increaseItem,
  decreaseItem,
  clearCart,
} = cartSlice.actions;

export default cartSlice.reducer;
