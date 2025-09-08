// addGoods.js
import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const addGoods = createAsyncThunk(
  "cart/addGoods",
  async (payload, thunkApi) => {
    try {
      const response = await axios.post(
        "http://localhost:5001/api/cart/addgoods",
        payload,
        { withCredentials: true }
      );

      return response.data;
    } catch (error) {
      console.error("加入失敗", error);

      let message = "新增商品時發生錯誤";

      if (axios.isAxiosError(error)) {
        if (error.response) {
          message = error.response.data?.message || "伺服器回傳錯誤";
        } else if (error.request) {
          message = "無法連線到伺服器，請檢查網路";
        } else {
          message = error.message;
        }
      } else if (error instanceof Error) {
        message = error.message;
      }

      return thunkApi.rejectWithValue(message);
    }
  }
);

export const emptiedCart = createAsyncThunk(
  "cart/emptyCart",
  async (_, thunkApi) => {
    try {
      const response = await axios.delete(
        "http://localhost:5001/api/cart/emptiedcart",
        { withCredentials: true }
      );

      //收到來自controller回傳的成功訊息物件
      //console.log(response.data);

      return response.data;
    } catch (error) {
      console.error("刪除失敗", error);

      let message = "清空購物車時發生一些錯誤";

      if (axios.isAxiosError(error)) {
        if (error.response) {
          message = error?.response?.data?.message || "伺服器回傳錯誤";
        } else if (error.request) {
          message = "無法連線到伺服器，請檢查網路";
        } else {
          message = error.message;
        }
      }

      return thunkApi.rejectWithValue(message);
    }
  }
);
