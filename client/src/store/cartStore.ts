import { create } from "zustand";

import axios from "axios";

const baseURL = "http://localhost:5000/carts";

const useCartStore = create((set) => ({
  cart: [],
  cartCount: 0,
  loading: false,
  error: null,

  addToCart: async (email: string, productId: string, quantity:number=1) => {
    set({ loading: true, error: null });
    try {
      const response = await axios.post(`${baseURL}/add-to-cart/${productId}`, {
        email,
        quantity,
      });

      const updatedCartItem = response.data.cartItemEntry;
      // console.log("Response", response.data);

       set((state) => {
         // Check if the product already exists in the cart
         const existingCartItemIndex = state.cart.findIndex(
           (item) => item.product === productId
         );

         let updatedCart;
         if (existingCartItemIndex !== -1) {
           // Update existing cart item
           updatedCart = [...state.cart];
           updatedCart[existingCartItemIndex] = updatedCartItem;
         } else {
           // Add new cart item
           updatedCart = [...state.cart, updatedCartItem];
         }

         return {
           cart: updatedCart,
           cartCount: updatedCart.reduce(
             (count, item) => count + item.quantity,
             0
           ),
           loading: false,
         };
       });
    } catch (error) {
      set({ error: error.message, loading: false });
    }
  },

  displayCart: async (email: string) => {
    set({ loading: true, error: null });
    try {
      const response = await axios.get(`${baseURL}/my-carts?email=${email}`);
      const data = response.data;
      console.log("data count", data.cartCount);

      if (data.success) {
        set({
          cart: data.cart || [], // Ensure cart is always an array
          cartCount: data.cartCount,
          loading: false,
        });
      } else {
        console.error(data.message);
      }
    } catch (error) {
      console.log("Error occur while displaying carts", error.message);
    }
  },

  removeCart: async (email: string, cartId: string) => {
    set({ loading: true, error: null });
    try {
      const response = await axios.delete(
        `${baseURL}/delete-cart/${cartId}`,
        { data: { email } }
      );
      console.log("Response after deleteing cart", response.data);

      set((state) => ({
        // cart: state.cart.filter((item) => item.id !== productId),
        cart: [...state.cart.filter((item) => item._id !== cartId)],
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
