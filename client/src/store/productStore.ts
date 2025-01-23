import { create } from "zustand";
import axios from "axios";

const baseURL = "http://localhost:5000/products";

const useProductStore = create((set) => ({
  products: [],
  allProducts: [],
  searchResults: [],

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

  fetchAllProducts: async () => {
    try {
      const response = await axios.get(`${baseURL}/all-products`);

      if (!response) {
        throw new Error("Failed to fetch products");
      }

      set({
        allProducts: response.data.data,
      });
    } catch (error) {
      console.error("Error while fetching products:", error);
      alert(error);
    }
  },

  searchProducts: async (category) => {
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
      alert(error.response?.data?.message || "Failed to search products");
    }
  },
}));

export default useProductStore;
