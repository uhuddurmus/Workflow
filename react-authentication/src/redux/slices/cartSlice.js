// cartSlice.js
import { createSlice } from "@reduxjs/toolkit";

const cartSlice = createSlice({
  name: "cart",
  initialState: {
    items: JSON.parse(sessionStorage.getItem("cart")) || [],
  },
  reducers: {
    addToCart: (state, action) => {
      const existingItem = state.items.find(
        (item) => item.id === action.payload.id
      );

      if (existingItem) {
        // Eğer ürün zaten sepette varsa, sadece miktarını arttır
        existingItem.quantity += 1;
      } else {
        // Eğer ürün sepette yoksa, yeni bir item olarak ekle
        state.items.push({ ...action.payload, quantity: 1 });
      }

      sessionStorage.setItem("cart", JSON.stringify(state.items));
    },
    removeFromCart: (state, action) => {
      const itemIdToRemove = action.payload.id;
      state.items = state.items.filter((item) => item.id !== itemIdToRemove);
      sessionStorage.setItem("cart", JSON.stringify(state.items));
    },
    clearCart: (state) => {
      state.items = [];
      sessionStorage.removeItem("cart");
    },
  },
});

export const { addToCart, removeFromCart, clearCartItem, clearCart } =
  cartSlice.actions;
export default cartSlice.reducer;
