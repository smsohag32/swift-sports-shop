import { createSlice } from "@reduxjs/toolkit";

const initialState = {
   cartItems: [],
   totalQuantity: 0,
   totalCost: 0,
};

const cartSlice = createSlice({
   name: "cart",
   initialState,
   reducers: {
      addToCart: (state, action) => {
         const existingItem = state.cartItems.find((item) => item._id === action.payload._id);
         if (existingItem) {
            existingItem.quantity += action.payload.quantity || 1;
         } else {
            state.cartItems.push({ ...action.payload, quantity: action.payload.quantity || 1 });
         }
         state.totalQuantity += action.payload.quantity || 1;
         state.totalCost += action.payload.price * (action.payload.quantity || 1);
      },

      removeFromCart: (state, action) => {
         const itemToRemove = state.cartItems.find((item) => item._id === action.payload);
         if (itemToRemove) {
            state.totalQuantity -= itemToRemove.quantity;
            state.totalCost -= itemToRemove.price * itemToRemove.quantity;
            state.cartItems = state.cartItems.filter((item) => item._id !== action.payload);
         }
      },

      updateQuantity: (state, action) => {
         const { _id, quantity } = action.payload;
         const item = state.cartItems.find((item) => item._id === _id);
         if (item) {
            const quantityDiff = quantity - item.quantity;
            item.quantity = quantity;
            state.totalQuantity += quantityDiff;
            state.totalCost += item.price * quantityDiff;
            if (item.quantity <= 0) {
               state.cartItems = state.cartItems.filter((item) => item._id !== _id);
            }
         }
      },

      clearCart: (state) => {
         state.cartItems = [];
         state.totalQuantity = 0;
         state.totalCost = 0;
      },
   },
});

export const { addToCart, removeFromCart, updateQuantity, clearCart } = cartSlice.actions;

export default cartSlice.reducer;
