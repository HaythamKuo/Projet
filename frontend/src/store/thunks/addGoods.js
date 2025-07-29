import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const addGoods = createAsyncThunk("cart/add", async () => {
  const res = await axios.post("http://localhost:5001/api/cart/addgoods");
});
