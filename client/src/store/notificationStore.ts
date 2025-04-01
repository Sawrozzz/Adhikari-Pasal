import { create } from "zustand";
import axios from "axios";

const baseURL = "http://localhost:5000/notification";

interface Notification {
  _id: string;
  message: string;
  createdAt: string;
}

interface NotificationState {
  notifications: Notification[];
  newNotificationCount: number;
  loading: boolean;
  error: string | null;
  fetchNotifications: () => void;
  setNewNotificationCount: (count: number) => void;
}

const useNotificationStore = create<NotificationState>((set) => ({
  notifications: [],
  newNotificationCount: 0,
  loading: false,
  error: null,
  fetchNotifications: async () => {
    set({ loading: true });
    try {
      const response = await axios.get(`${baseURL}/all`);
      const data = response.data.notification; // Extract the notifications array
      console.log("Fetched notifications:", data); // Log fetched data
      set({
        notifications: data,
        newNotificationCount: data.length,
        loading: false,
      });
    } catch (error) {
      console.error("Error fetching notifications:", error); // Log error
      set({ error: error.message, loading: false });
    }
  },
  setNewNotificationCount: (count) => set({ newNotificationCount: count }),
}));

export default useNotificationStore;
