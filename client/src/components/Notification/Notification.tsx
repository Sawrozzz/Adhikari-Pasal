import { useState } from "react";
import { Bell } from "lucide-react";

const notifications = [
  { message: "New order received", dateTime: "2023-10-01 10:00 AM" },
  { message: "Payment processed", dateTime: "2023-10-01 11:00 AM" },
  { message: "Order shipped", dateTime: "2023-10-01 12:00 PM" },
];

const NotificationDropdown = () => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };

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
            <ul className="mt-2">
              {notifications.map((notification, index) => (
                <li key={index} className="border-b border-gray-200 py-2">
                  <p className="text-sm text-gray-700">
                    {notification.message}
                  </p>
                  <p className="text-xs text-gray-500">
                    {notification.dateTime}
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
