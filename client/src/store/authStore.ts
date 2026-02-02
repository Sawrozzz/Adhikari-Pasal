import { create } from "zustand";
import axios from "axios";
import { decodeToken } from "../utils/tokenDecoded";

const baseURL = "http://localhost:5000/users";

const useAuthStore = create((set) => ({
  user: JSON.parse(localStorage.getItem("user") || "null"),
  token: localStorage.getItem("token"),
  // isLoggedIn: localStorage.getItem("token") ? true : false,
  isLoggedIn: !!localStorage.getItem("token"),
  allUsers: [],
  profileData: null,
  loading: false,
  error: null,
  allUsersCount: 0,
  userNotification:[],

  fetchUserProfile: async () => {
    const user = JSON.parse(localStorage.getItem("user") || "null");
    const token = localStorage.getItem("token");

    if (!user || !token) {
      console.error("User is not logged in.");
      return;
    }

    const userDetails: any = decodeToken(token);
    const userId = userDetails?.userId;

    try {
      const response = await axios.get(`${baseURL}/profile/${userId}`);
      set({
        profileData: response.data.data,
      });
    } catch (error: any) {
      console.error("Error while fetching profile", error.message);
    }
  },

  uploadProfilePicture: async (file: File) => {
    const token = localStorage.getItem("token");

    if (!token) {
      console.error("User is not logged In");
      return;
    }
    const userDetails: any = decodeToken(token);
    const userId = userDetails?.userId;

    if (!userId) {
      console.error("Invalid token.");
      return;
    }

    const formData = new FormData();

    formData.append("profileImage", file);

    set({ loading: true, error: null });

    try {
      const response = await axios.post(`${baseURL}/profile/upload`, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
          Authorization: `Bearer ${token}`, // Include the token in the Authorization header
        },
      });
      set((state: any) => ({
        profileData: {
          ...state.profileData,
          profileImage: response.data.data.picture,
        },
        loading: false,
      }));
      return response.data;
    } catch (error: any) {
      console.error("Error occur while uploading profile", error.message);

      set({ loading: false, error: error.message });
    }
  },

  signup: async (userData: any) => {
    try {
      const response = await axios.post(`${baseURL}/register`, userData);
      const { user: registeredData } = response.data.data;

      set({
        user: registeredData,
        isLoggedIn: false,
        notification: [response.data.data.notification.message],
      });
      alert("User signup successFull, you can login now");
    } catch (error: any) {
      console.error("SignUp failed:", error);
      alert(error.message || "Signup failed");
    }
  },

  login: async (userData: any) => {
    try {
      const response = await axios.post(`${baseURL}/login`, userData);
      const { token, user: loggedInUserData } = response.data.data;
      set({
        user: loggedInUserData,
        token,
        isLoggedIn: true,
      });
      localStorage.setItem("token", token);
      localStorage.setItem("user", JSON.stringify(loggedInUserData));
    } catch (error) {
      console.error("Error occured while login:", error);
      set({ error: error.message, loading: false });
      alert(error.message || "Login failed");
    }
  },

  logout: () => {
    set({
      user: null,
      token: null,
      isLoggedIn: false,
    });

    localStorage.removeItem("token");
    localStorage.removeItem("user");
  },

  delete: async (email: string) => {
    set({ loading: true, error: null });
    try {
      await axios.delete(`${baseURL}/delete`, {
        data: { email },
      });

      set((state: any) => ({
        allUsers: state.allUsers.filter((user: any) => user.email !== email),
      }));
    } catch (error: any) {
      set({
        loading: false,
        error: error.response ? error.response.data.message : error.message,
      });
    }
  },

  fetchUsers: async () => {
    try {
      const response = await axios.get(`${baseURL}/allUsers`);

      set({
        allUsers: response.data.data.users,
        allUsersCount: response.data.data.count,
      });
    } catch (error: any) {
      console.error("Error while fetching users:", error);
      alert(error.message || "Fetching users failed");
    }
  },
}));

export default useAuthStore;
