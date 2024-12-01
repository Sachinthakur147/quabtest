import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
  cartList: [],
  cartListError: "",
};

const url = "http://localhost:5000/api";
// !  fetch Cart List
export const fetchCartList = createAsyncThunk("fetchCartList", async () => {
  const auth = JSON.parse(localStorage.getItem("auth"));
  return await axios
    .get(`${url}/cart`, {
      headers: {
        Authorization: `bearer ${auth.token}`,
      },
    })
    .then((res) => res.data)
    .catch((err) => {
      console.log("err", err);
      if (err.response.status === 404) {
        throw Error(err.message);
      }
      if (err.response.status === 500) {
        throw Error(err.message);
      }
      if (err.response.status !== 404) {
        throw Error(err.response.data.message);
      }
    });
});

const listcart = createSlice({
  name: "listcart",
  initialState,

  extraReducers: (builder) => {
    // ! Fetch Cart
    builder.addCase(fetchCartList.pending, (state) => {
      state.cartListError = "";
      state.cartList = [];
    });
    builder.addCase(fetchCartList.fulfilled, (state, action) => {
      state.cartListError = "";
      state.cartList = action.payload;
    });
    builder.addCase(fetchCartList.rejected, (state, action) => {
      state.cartListError = action.error.message;
      state.cartList = [];
    });
  },
});

export default listcart.reducer;
