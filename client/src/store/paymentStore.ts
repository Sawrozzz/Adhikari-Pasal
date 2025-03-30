import { create } from "zustand";
import axios from "axios";
// import useAuthStore from "./authStore";
import { decodeToken } from "../utils/tokenDecoded";

const baseURL = "http://localhost:5000/payment";
const website_url = "http://localhost:5000";

export interface PaymentData {
  orders: [];
  loading: boolean;
  error: string | null;
  initializePayment: (
    amount: number,
    itemIds: string[],
    website_url: string
  ) => Promise<void>;
  verifyKhaltiPayment: (pidx: string) => Promise<void>;
}

const usePaymentStore = create((set) => ({
  orders: [],
  loading: false,
  error: null,
  token:localStorage.getItem("token"),

  initializePayment: async (
    itemIds: string[],
    website_url: string
  ) => {
    set({ loading: true, error: null });
    console.log("clicked");
  const token = localStorage.getItem("token");

  const userDetails = decodeToken(token);
  const userId = userDetails?.userId;
  console.log(userDetails);
  
    if (!userId || !token) {
      console.error("User is not logged in.");
      set({ loading: false });
      return;
    }

    
    try {
      // console.log("clicked try");
      
     const response = await axios.post(
       `${baseURL}/initialize-khalti`,
       {
         itemIds,
         website_url: `${website_url}`,
       },
       {
         headers: {
           Authorization: `Bearer ${token}`,
         },
       }
     );
      
      console.log(response.data);
      const paymentUrl = response.data.payment.payment_url;

      // console.log(paymentUrl)

    setTimeout(() => {
      window.location.href = paymentUrl;
    }, 2000);

      set({
        orders: [response.data.purchasedItemData],
        loading: false,
      });
        localStorage.setItem("paymentInitiated", "true");
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
