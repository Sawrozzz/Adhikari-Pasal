import { create } from "zustand";
import axios from "axios";

const baseURL = "http://localhost:5000/payment";

export interface PaymentData {
  orders: [];
  loading: boolean;
  error: string | null;
  initializePayment: (
    amount: number,
    itemId: string,
    website_url: string
  ) => Promise<void>;
  verifyKhaltiPayment: (pidx: string) => Promise<void>;
}

const usePaymentStore = create((set) => ({
  orders: [],
  loading: false,
  error: null,

  initializePayment: async (
    amount: number,
    itemId: string,
    website_url: string
  ) => {
    set({ loading: true, error: null });
    try {
      const response = await axios.post(`${baseURL}/initialize-khalti`, {
        amount,
        itemId,
        website_url,
      });
      console.log(response.data);

      set({
        orders: [response.data.purchasedItemData],
        loading: false,
      });
    } catch (error) {
      console.error("Error while initialize payment", error.message);
      set({ error: error.message, loading: false });
    }
  },

  verifyKhaltiPayment: async (pidx: string) => {
    set({ loading: true, error: null });
    try {
      const response = await axios.get(`${baseURL}/complete-khalti-payment`, {
        params: { pidx },
      });
      // Assuming the response contains the updated orders
      set({ orders: response.data.orders, loading: false });
    } catch (error) {
      console.error("Error verifying Khalti payment:", error.message);
      set({ error: error.message, loading: false });
    }
  },
}));

export default usePaymentStore;
