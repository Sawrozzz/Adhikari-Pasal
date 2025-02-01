import { create } from "zustand";
import axios from "axios";

const baseURL = "http://localhost:5000/products";

const useProductStore = create((set) => ({
  products: [],
  allProducts: [],
  searchResults: [],
  loading: false,
  error: null,

  createProduct: async (productData) => {
    set({ loading: true, error: null });

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
      set({ error: error, message, loadind: false });
      console.error("Error while creating product", error);
    }
  },

  fetchAllProducts: async () => {
    set({ loading: true, error: null });
    try {
      const response = await axios.get(`${baseURL}/all-products`);

      if (!response) {
        throw new Error("Failed to fetch products");
      }

      set({
        allProducts: response.data.data,
      });
    } catch (error) {
      set({ loading: false, error: error.message });
      console.error("Error while fetching products:", error);
    }
  },

  searchProducts: async (category) => {
    set({ loading: true, error: null });
    try {
      const response = await axios.get(
        `${baseURL}/search?category=${category}`
      );
      if (!response.data) {
        throw new Error("Failed to fetch products");
      }
      console.log("Search Results:", response.data);
      set({
        searchResults: response.data.data,
      });
    } catch (error) {
      console.error("Error while searching products:", error);
      set({ loading: false, error: error, message });
    }
  },

  removeProduct: async (productId: string, email: string) => {
    set({ loading: true, error: null });
    try {
      const response = await axios.delete(`${baseURL}/delete/${productId}`, {
        data: { email },
      });

      console.log(response.data);

      set((state) => ({
        products: [...state.products.filter((item) => item._id !== productId)],
        error: null,
        loading: false,
      }));
    } catch (error) {
      set({ loading: false, error: error.message });
    }
  },
}));

export default useProductStore;
