import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const fetchGoods = createAsyncThunk("cart/fetch", async () => {
  const res = await axios.get("http://localhost:5001/api/cart");
  return res;
});
