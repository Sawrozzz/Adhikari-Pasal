// src/store/orderStore.js
import { create } from "zustand";
import { decodeToken } from "../utils/tokenDecoded";

const useIndividualOrderStore = create((set) => ({
  // Orders data
  orders: [],
  isLoading: false,
  error: null,

  // Fetch orders from API
  fetchOrders: async () => {
    set({ isLoading: true, error: null });

    const token = localStorage.getItem("token");

    const userDetails = decodeToken(token);
    const userId = userDetails.userId;

    try {
      const response = await fetch(`http://localhost:5000/order/${userId}`);
      const data = await response.json();
      console.log(data);

      if (data) {
        // Transform API data to match our component structure
        const transformedOrders = data.order.map((order) => ({
          orderId: order._id,
          orderCreatedTime: order.createdAt,
          location: order.address,
          status: order.status,
          totalPrice: order.order_data.totalPrice/100,
          cartItems: order.order_data.items.map((item) => ({
            cartId: item._id,
            productName: item.product.name,
            price: item.price ,
            discountedPrice: item.discountedPrice,
            quantity: item.quantity,
            image: item.product.image || "/api/placeholder/80/80",
            category: item.product.category,
            discount: item.product.discount,
          })),
          paymentMethod: order.payment_method,
          userName: order.user.fullName,
        }));

        set({ orders: transformedOrders, isLoading: false });
      } else {
        throw new Error(data.message || "Failed to fetch orders");
      }
    } catch (error) {
      console.error("Error fetching orders:", error);
      set({ error: error.message, isLoading: false });
    }
  },

  // Delete order
  deleteOrder: async (orderId) => {
    set({ isLoading: true, error: null });
    try {
      // We're just removing it from the local state
      // In a real app, you'd call an API to delete it
      set((state) => ({
        orders: state.orders.filter((order) => order.orderId !== orderId),
        isLoading: false,
      }));

      // Uncomment below for actual API implementation
      /*
      const response = await fetch(`http://localhost:5000/order/${orderId}`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
          // Include auth headers as needed
        }
      });
      const data = await response.json();
      
      if (data.success) {
        set(state => ({ 
          orders: state.orders.filter(order => order.orderId !== orderId),
          isLoading: false 
        }));
      } else {
        throw new Error(data.message || 'Failed to delete order');
      }
      */
    } catch (error) {
      console.error("Error deleting order:", error);
      set({ error: error.message, isLoading: false });
    }
  },
}));

export default useIndividualOrderStore;
