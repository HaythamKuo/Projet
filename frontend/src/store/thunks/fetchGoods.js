import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const fetchGoods = createAsyncThunk("cart/fetch", async (userId) => {
  const res = await axios.get(`http://localhost:5001/api/${userId}`);
  return res.data;
});
