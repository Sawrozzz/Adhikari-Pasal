import { create } from "zustand";
import axios from "axios";

const baseURL = "http://localhost:5000";

const useAuthStore = create((set) => ({
  user: JSON.parse(localStorage.getItem("user") || "null"),
  token: localStorage.getItem("token"),
  isLoggedIn: localStorage.getItem("token") ? true : false,

  signup: async (userData) => {
    console.log("clicked again");

    try {
      const response = await axios.post(`${baseURL}/users/register`, userData);
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
      const response = await axios.post(`${baseURL}/users/login`, userData);
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
  },
}));

export default useAuthStore;
