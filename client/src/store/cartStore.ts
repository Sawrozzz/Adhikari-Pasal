import { create } from "zustand";

import axios from "axios";

const baseURL = "http://localhost:5000/carts";

const useCartStore = create((set) => ({
  cart: [],
  cartCount: 0,
  loading: false,
  error: null,

  addToCart: async (email: string, productId: string) => {
    set({ loading: true, error: null });
    try {
      const response = await axios.post(`${baseURL}/add-to-cart/${productId}`, {
        email,
      });
      // console.log("Response", response.data);

      set((state) => ({
        cart: [...state.cart, response.data.product],
        cartCount:state.cartCount + 1,
        loading: false,
      }));
    } catch (error) {
      set({ error: error.message, loading: false });
    }
  },

  displayCart: async (email: string) => {
    set({ loading: false, error: null });
    try {
      const response = await axios.get(`${baseURL}/my-carts?email=${email}`);
      const data = response.data;
      console.log("data count", data.cartCount);

      if (data.success) {
        set({ cart: data.cart, cartCount: data.cartCount });
      } else {
        console.error(data.message);
      }
    } catch (error) {
      console.log("Error occur while displaying carts", error.message);
    }
  },

  removeCart: async (email: string, productId: string) => {
    set({ loading: true, error: null });
    try {
      const response = await axios.delete(
        `${baseURL}/delete-cart/${productId}`,
        { data: { email } }
      );
      console.log("Response after deleteing cart", response.data);

      set((state) => ({
        // cart: state.cart.filter((item) => item.id !== productId),
        cart: [...state.cart.filter((item) => item._id !== productId)],
        error: null,
        cartCount: state.cartCount - 1,
        loading: false,
      }));
    } catch (error) {
      console.log("Error while removing cart", error.message);
      set({ error: error.message, loading: false });
    }
  },
}));

export default useCartStore;
