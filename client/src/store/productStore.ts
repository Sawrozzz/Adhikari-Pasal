import { create } from "zustand";
import axios from "axios";

const baseURL = "http://localhost:5000/products";

const useProductStore = create((set) => ({
  products: [],

  createProduct: async (productData) => {
    try {
      const response = await axios.post(`${baseURL}/create`, productData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      set((state) => ({
        products: [...state.products, response.data.product], // Correctly returning the object here
      }));
      
      return response.data;
    } catch (error) {
      console.error("Error while creating product", error);
      alert(error.response?.data?.message || "Failed to create product");
    }
  },
}));

export default useProductStore;
