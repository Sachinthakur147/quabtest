import { createSlice } from "@reduxjs/toolkit";
import axios from "axios";

export const noOfCartItem = async () => {
  const auth = JSON.parse(localStorage.getItem("auth"));
  // const response = axios
  //   .get("http://localhost:5000/api/cart")
  //   .then((res) => res.data)
  //   .catch((err) => err);
  const response = await axios.get("http://localhost:5000/api/cart", {
    headers: {
      Authorization: `bearer ${auth.token}`,
    },
  });
  console.log(response, "Sachin");
  return response;
};
export const cartSlice = createSlice({
  name: "cart",
  initialState: {
    noOfItems: noOfCartItem.length > 0 ? noOfCartItem.length : 0,
  },
  reducers: {
    setNoOfItemsToCart: (state, { payload }) => {
      state.noOfItems = payload;
    },
  },
});

/** Actions */
export const { setNoOfItemsToCart } = cartSlice.actions;

/** Selectors */
export const selectNoOfItemsFromCart = (state) => state.cart.noOfItems;

export default cartSlice.reducer;
