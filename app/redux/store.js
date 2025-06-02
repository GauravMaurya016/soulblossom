import { configureStore } from "@reduxjs/toolkit";
import cartReducer from "@/app/redux/features/cartslice";
export const store = configureStore({ reducer: { cart: cartReducer } });