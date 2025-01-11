import { configureStore } from "@reduxjs/toolkit";
import { apiSlice } from "./slice/apiSlice";
import authReducer from "@/redux-store/slice/authSlice";
import cartReducer from "@/redux-store/slice/cartSlice";
const store = configureStore({
   reducer: {
      auth: authReducer,
      cart: cartReducer,
      [apiSlice.reducerPath]: apiSlice.reducer,
   },
   middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(apiSlice.middleware),
});

export default store;
