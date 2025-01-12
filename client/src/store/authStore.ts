import { create } from "zustand";
import axios from "axios";

const baseURL = "http://localhost:5000/users";

const useAuthStore = create((set) => ({
  user: JSON.parse(localStorage.getItem("user") || "null"),
  token: localStorage.getItem("token"),
  // isLoggedIn: localStorage.getItem("token") ? true : false,
  isLoggedIn: !!localStorage.getItem("token"),
  allUsers: [],

   userProfile: async () => {
    const user = JSON.parse(localStorage.getItem("user") || "null");
    const token = localStorage.getItem("token");

    if (!user || !token) {
      console.error("User is not logged in.");
      
      return;
    }

    // try {
    //   const response = await axios.get(`${baseURL}/profile/${user.id}`, {
    //     headers: {
    //       Authorization: `Bearer ${token}`,
    //     },
    //   });

    //   if (response.status === 200) {
    //     console.log("Profile fetched successfully:", response.data);
    //     set({ user: response.data }); // Update Zustand store with fetched user profile
    //   } else {
    //     throw new Error("Failed to fetch user profile.");
    //   }
    // } catch (error) {
    //   console.error("Error while fetching user profile:", error);
    //   alert("Failed to fetch user profile.");
    // }
  },

  signup: async (userData) => {
    console.log("clicked again");

    try {
      const response = await axios.post(`${baseURL}/register`, userData);
      const { userData: registeredData } = response.data;
      console.log(response.data.userData);

      set({
        user: registeredData,
        isLoggedIn: false,
      });
      alert("User signup successFull, you can login now");
    } catch (error) {
      console.error("SignUp failed:", error);
      alert(error);
    }
  },

  login: async (userData) => {
    try {
      const response = await axios.post(`${baseURL}/login`, userData);
      const { token, userData: loggedInUserData } = response.data;
      set({
        user: loggedInUserData,
        token,
        isLoggedIn: true,
      });
      localStorage.setItem("token", token);
      localStorage.setItem("user", JSON.stringify(loggedInUserData));
    } catch (error) {
      console.error("Error occured while login:", error);
      alert(error);
    }
  },

  logout: () => {
    set({
      user: null,
      token: null,
      isLoggedIn: false,
    });

    // Remove token from localStorage
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    console.log("User logged out successfully.");
  },

  fetchUsers: async () => {
    try {
      const response = await axios.get(`${baseURL}/allUsers`);

      set({
        allUsers: response.data.data,
      });
    } catch (error) {
      console.error("Error while fetching users:", error);
      alert(error);
    }
  },
}));

export default useAuthStore;
