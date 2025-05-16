import { configureStore } from "@reduxjs/toolkit";
import cartReducer from "./cartSlice";

const loadCart = () => {
  try {
    const stored = localStorage.getItem("cart");
    return stored ? JSON.parse(stored) : { items: [] };
  } catch {
    return { items: [] };
  }
};

const saveCart = (state) => {
  try {
    localStorage.setItem("cart", JSON.stringify(state.cart));
  } catch (e) {
    console.error("Could not save cart", e);
  }
};

const preloadedState = {
  cart: loadCart()
};

const store = configureStore({
  reducer: {
    cart: cartReducer,
  },
  preloadedState,
});

// Save on every change
store.subscribe(() => {
  saveCart(store.getState());
});

export default store;
