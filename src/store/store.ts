import { combineReducers, configureStore } from "@reduxjs/toolkit";
import authReducer from "../redux/authSlice";
import productReducer from "../redux/productSlice";
import shopReducer from "../redux/shopSlice";
import cartReducer from "../redux/cartSlice";

const rootReducer = combineReducers({
  auth: authReducer,
  product: productReducer,
  shop: shopReducer,
  cart: cartReducer,
});

export const store = configureStore({
  reducer: rootReducer,
});

// ✅ Types for the entire Redux setup
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
