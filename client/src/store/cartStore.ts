import { create } from "zustand";

import axios from "axios";

const baseURL = "http://localhost:5000/carts";

const useCartStore = create((set) => ({
  cart: [],
  cartCount: 0,
  totalAmount: 0,
  loading: false,
  error: null,

  addToCart: async (email: string, productId: string, quantity: number = 1) => {
    set({ loading: true, error: null });
    try {
      const response = await axios.post(`${baseURL}/add-to-cart/${productId}`, {
        email,
        quantity,
      });

      const updatedCartItem = response.data.cartItemEntry; // Get the new or updated cart item

      set((state) => {
        // Check if the product already exists in the cart
        const existingCartItemIndex = state.cart.findIndex(
          (item) => item.product._id === updatedCartItem.product._id
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

        // Recalculate the total discounted price for the entire cart
        const newTotalDiscountedPrice = updatedCart.reduce(
          (total, item) => total + item.discountedPrice * item.quantity,
          0
        );

        return {
          cart: updatedCart,
          cartCount: updatedCart.reduce(
            (count, item) => count + item.quantity,
            0
          ),
          totalDiscountedPrice: newTotalDiscountedPrice, // Update the total price
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
     set({loading:false, error:error.message})
    }
  },

  removeCart: async (email: string, cartId: string) => {
    set({ loading: true, error: null });
    try {
      const response = await axios.delete(`${baseURL}/delete-cart/${cartId}`, {
        data: { email },
      });

      set((state) => ({
        // cart: state.cart.filter((item) => item.id !== productId),
        cart: [...state.cart.filter((item) => item._id !== cartId)],
        error: null,
        cartCount: state.cartCount - 1,
        loading: false,
      }));
    } catch (error) {
      set({ error: error.message, loading: false });
    }
  },

  updateCartQuantity: async (
    email: string,
    cartId: string,
    quantity: number
  ) => {
    set({ loading: true, error: null });
    try {
      const response = await axios.patch(`${baseURL}/update-cart/${cartId}`, {
        email,
        quantity,
      });

      const updatedCartItem = response.data.cartItem;

      // Update cart in state
      set((state) => {
        const updatedCart = state.cart.map((item) =>
          item._id === cartId ? updatedCartItem : item
        );
        const newTotalAmount = updatedCart.reduce(
          (total, item) => total + item.discountedPrice * item.quantity,
          0
        );
        return {
          cart: updatedCart,
          totalAmount: newTotalAmount,
          loading: false,
        };
      });
    } catch (error) {
      set({ error: error.message, loading: false });
    }
  },
}));

export default useCartStore;
