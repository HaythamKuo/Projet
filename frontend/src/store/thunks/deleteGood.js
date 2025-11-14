import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const isProd = import.meta.env.DEV
  ? import.meta.env.VITE_SERVER_DEV
  : import.meta.env.VITE_SERVER_PRODUCTION;

export const deleteGood = createAsyncThunk(
  "cart/delete",
  async (productId, thunkApi) => {
    try {
      const res = await axios.delete(
        // `http://localhost:5001/api/cart/${productId}`,

        `${isProd}/api/cart/${productId}`,
        { withCredentials: true }
      );
      console.log(productId);
      return res.data;
    } catch (err) {
      console.log("刪除失敗", err);
      return thunkApi.rejectWithValue(
        err.response?.data || "deleteGood 發生錯誤"
      );
    }
  }
);
