import { useState, useEffect } from "react";
import { Bell } from "lucide-react";
import useNotificationStore from "../../store/notificationStore";

const NotificationDropdown = () => {
  const [isOpen, setIsOpen] = useState(false);

  const { notifications, loading, error, fetchNotifications } =
    useNotificationStore();

  useEffect(() => {
    fetchNotifications();
  }, [fetchNotifications]);

  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <div className="relative">
      <button
        onClick={toggleDropdown}
        className="ml-4 p-2 rounded-md text-gray-400 hover:text-gray-500 hover:bg-gray-100"
      >
        <Bell className="w-5 h-5" />
      </button>
      {isOpen && (
        <div className="absolute right-0 mt-2 w-96 bg-white border border-gray-200 rounded-md shadow-lg z-10">
          <div className="p-4">
            <h3 className="text-lg font-semibold">Notifications</h3>
            <ul className="mt-2 flex flex-col-reverse">
              {Array.isArray(notifications) &&
                notifications.map((notification, index) => (
                  <li key={notification._id} className="mb-2">
                    <p
                      className={`text-sm ${
                        index % 3 === 0
                          ? "text-blue-700"
                          : index % 3 === 1
                          ? "text-green-700"
                          : "text-red-700"
                      }`}
                    >
                      {notification.message}
                    </p>
                    <p className="text-xs text-gray-500">
                      {new Date(notification.createdAt).toLocaleString()}
                    </p>
                  </li>
                ))}
            </ul>
          </div>
        </div>
      )}
    </div>
  );
};

export default NotificationDropdown;
