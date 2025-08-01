import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const fetchGoods = createAsyncThunk(
  "cart/fetch",
  async (_, thunkApi) => {
    try {
      const res = await axios.get(`http://localhost:5001/api/cart/`, {
        withCredentials: true,
      });

      return res.data;
    } catch (err) {
      console.error("購物車取得失敗", err);
      return thunkApi.rejectWithValue(
        err.response?.data || "fetchGoods.jsx發生意外"
      );
    }
  }
);
