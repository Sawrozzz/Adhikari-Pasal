import { create } from "zustand";
import axios from "axios";

const baseURL = "http://localhost:5000/products";

const useProductStore = create((set) => ({
  products: [],
  allProducts: [],
  searchResults: [],
  loading: false,
  error: null,
  productLength: 0,
  productNotification: [],

  createProduct: async (productData) => {
    set({ loading: true, error: null });

    try {
      const response = await axios.post(`${baseURL}/create`, productData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      // console.log(response.data)
      
      set((state) => ({
        products: [...state.products, response.data.product], // Correctly returning the object here
        productNotification: response.data.notification.message,
      }));

      

      return response.data;
    } catch (error) {
      set({ error: error.message, loading: false });
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
        productLength: response.data.productLength,
      });
    } catch (error) {
      set({ loading: false, error: error.message });
      console.error("Error while fetching products:", error);
    }
  },

  searchProducts: async (category: string) => {
    set({ loading: true, error: null });
    try {
      const response = await axios.get(
        `${baseURL}/search?category=${category}`
      );
      if (!response.data || response.data.data.length === 0) {
        set({
          searchResults: [],
          loading: false,
        });
        throw new Error("No products found");
      }
      // console.log("Search Results:", response.data);
      set({
        searchResults: response.data.data,
        loading: false,
      });
    } catch (error) {
      console.error("Error while searching products:", error.message);
      set({ loading: false, error: error.message });
    }
  },

  removeProduct: async (productId: string, email: string) => {
    set({ loading: true, error: null });
    try {
      const response = await axios.delete(`${baseURL}/delete/${productId}`, {
        data: { email },
      });

      set((state) => {
        const updatedProducts = [
          ...state.allProducts.filter((item) => item._id !== productId),
        ];
        return {
          products: updatedProducts,
          error: null,
          loading: false,
        };
      });
    } catch (error) {
      console.error("Error deleting product:", error);
      set({ loading: false, error: error.message });
    }
  },
}));

export default useProductStore;
