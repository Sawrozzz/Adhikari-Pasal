import { create } from "zustand";

import axios from "axios";

const baseURL = "http://localhost:5000/carts";

const useCartStore = create((set) => ({
  cart: [],
  cartCount: 0,
  totalAmount: 0,
  loading: false,
  error: null,
  cartNotification: 0,

  addToCart: async (email: string, productId: string, quantity: number = 1) => {
    set({ loading: true, error: null });
    try {
      const response = await axios.post(`${baseURL}/add-to-cart/${productId}`, {
        email,
        quantity,
      });

      const updatedCartItem = response.data.data.cart; // Get the new or updated cart item

      set((state: any) => {
        try {
          // Ensure `updatedCartItem` exists before proceeding
          if (!updatedCartItem || !updatedCartItem.product) {
            console.error(
              "🚨 Error: updatedCartItem is undefined or invalid",
              updatedCartItem
            );
            return state; // Return previous state to prevent breaking Zustand
          }

          // Find index of existing cart item
          const existingCartItemIndex = state.cart.findIndex(
            (item: any) => item?.product?._id === updatedCartItem.product._id
          );

          let updatedCart;
          if (existingCartItemIndex !== -1) {
            // Update existing item in cart
            updatedCart = [...state.cart];
            updatedCart[existingCartItemIndex] = updatedCartItem;
          } else {
            // Add new item to cart
            updatedCart = [...state.cart, updatedCartItem];
          }

          // 🛠 Fix: Prevent `reduce` from breaking if `updatedCart` has `undefined` items
          const validCartItems = updatedCart.filter(
            (item: any) => item && item.discountedPrice
          );

          // Calculate total discounted price safely
          const newTotalDiscountedPrice = validCartItems.reduce(
            (total: number, item: any) => total + item.discountedPrice * item.quantity,
            0
          );

          return {
            cart: updatedCart,
            cartCount: validCartItems.reduce(
              (count: number, item: any) => count + item.quantity,
              0
            ),
            totalDiscountedPrice: newTotalDiscountedPrice,
            cartNotification: state.cartNotification + 1,
            loading: false,
          };
        } catch (error) {
          console.error("🚨 Error inside Zustand `set` function:", error);
          return state; // Return previous state if an error occurs
        }
      });
    } catch (error) {
      set({ error: error.message, loading: false });
    }
  },
  resetCartNotification: () => {
    set({ cartNotification: 0 }); // ✅ Reset notification count when viewing cart
  },

  displayCart: async (email: string) => {
    set({ loading: true, error: null });
    try {
      const response = await axios.get(`${baseURL}/my-carts?email=${email}`);
      const data = response.data;

      if (data.success) {
        set({
          cart: data.data.cart || [], // Ensure cart is always an array
          cartCount: data.data.count,
          loading: false,
          cartNotification: 0,
        });
      } else {
        console.error(data.message);
      }
      set({ loading: false, error: error.message });
    } catch (error: any) {
      set({ loading: false, error: error.message });
    }
  },

  removeCart: async (email: string, cartId: string) => {
    set({ loading: true, error: null });
    try {
      await axios.delete(`${baseURL}/delete-cart/${cartId}`, {
        data: { email },
      });

      set((state: any) => ({
        // cart: state.cart.filter((item) => item.id !== productId),
        cart: [...state.cart.filter((item: any) => item._id !== cartId)],
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

      const updatedCartItem = response.data.data.cartItem;

      // Update cart in state
      set((state: any) => {
        const updatedCart = state.cart.map((item: any) =>
          item._id === cartId ? updatedCartItem : item
        );
        const newTotalAmount = updatedCart.reduce(
          (total: number, item: any) => total + item.discountedPrice * item.quantity,
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
