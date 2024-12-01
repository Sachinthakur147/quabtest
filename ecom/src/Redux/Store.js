import { configureStore } from "@reduxjs/toolkit";
import cartSlice from "./features/cart/cartSlice";
import listcart from "./features/cart/listcart";

export const store = configureStore({
  reducer: {
    cart: cartSlice,
    list: listcart,
  },
});
