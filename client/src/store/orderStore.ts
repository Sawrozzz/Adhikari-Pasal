import { create } from "zustand";
import axios from "axios";

const baseURL = "http://localhost:5000/order";

export enum orderStatus {
  Created = "created",
  PaidAndProcessing = "paid and processing",
  Shipping = "shipping",
  Delivered = "delivered",
}

interface Order {
  _id: string;
  user: string;
  userName: string;
  payment_method: string;
  order_data: string;
  status: orderStatus;
  address: string;
  createdAt: string;
  updatedAt: string;
}
interface OrderState {
  orders: Order[];
  loading: boolean;
  orderCount: number;
  totalSumOfTotalPrices: number;

  error: string | null;
  fetchOrders: () => Promise<void>;
  updateOrderStatus: (orderId: string, status: orderStatus) => Promise<void>;
}

const useOrderStore = create<OrderState>((set) => ({
  orders: [],
  orderCount: 0,
  totalSumOfTotalPrices: 0,
  loading: false,
  error: null,

  fetchOrders: async () => {
    set({ loading: true, error: null });
    try {
      const response = await axios.get(`${baseURL}/allOrders`);

      set({
        orders: response.data.orders,
        orderCount: response.data.orderCount,
        totalSumOfTotalPrices: response.data.totalSumOfTotalPrices /100,
        loading: false,
      });
    } catch (error) {
      set({ error: error.message, loading: false });
    }
  },

  updateOrderStatus: async (orderId: string, status: orderStatus) => {
    set({ loading: true, error: null });
    try {
      const token = localStorage.getItem("token");
      if (!token) {
        throw new Error("Token not found");
      }

      const response = await axios.patch(
        `${baseURL}/updateOrder/${orderId}`,
        { status },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      set((state) => ({
        orders: state.orders.map((order) =>
          order._id === orderId ? { ...order, status } : order
        ),
        loading: false,
      }));
    } catch (error) {
      console.error("error while updating the status", error.message);
      set({ error: error.message, loading: false });
    }
  },

  deleteOrder: async (orderId: string) => {
    set({ loading: true, error: null });
    try {

      const token = localStorage.getItem("token");
      if (!token) {
        throw new Error("Token not found");
      }

      const response = await axios.delete(`${baseURL}/deleteOrder/${orderId}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      set((state) => ({
        orders: [...state.orders.filter((order) => order._id !== orderId)],
        error: null,
        loading: false,
      }));
    } catch (error) {
      console.error("Error in frontend while deleting order", error.message);
      set({ error: error.message, loading: false });
    }
  },
}));

export default useOrderStore;
