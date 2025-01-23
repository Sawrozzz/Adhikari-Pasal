import { create } from "zustand";

import axios from "axios";

const baseURL = "http://localhost:5000/carts";

const useCartStore = create((set) => ({
  cart: [],
  loading: false,
  error: null,

  addToCart: async (email, productId) => {
    set({ loading: true, error: null });
    try {
      const response = await axios.post(`${baseURL}/add-to-cart/${productId}`, {
        email,
      });
      console.log("Response", response.data);
      
      set((state) => ({
        cart: [...state.cart, response.data.product],
        loading: false,
      }));
    } catch (error) {
      set({ error: error.message, loading: false });
    }
  },
}));

export default useCartStore;