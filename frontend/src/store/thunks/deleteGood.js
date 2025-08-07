import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const deleteGood = createAsyncThunk(
  "cart/delete",
  async (productId, thunkApi) => {
    try {
      const res = await axios.delete(
        `http://localhost:5001/api/cart/${productId}`,
        {
          withCredentials: true,
        }
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
