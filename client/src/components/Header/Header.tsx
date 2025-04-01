
import { useState } from "react";
import { Link } from "react-router-dom";
import Navbar from "../NavBar/Navbar";
import SearchBar from "../SearchBar/SearchBar";
import logo from '../../assets/logo.png' 
import { ShoppingCart, Menu, X, Bell, BellIcon } from "lucide-react";
import useAuthStore from "../../store/authStore";
import useCartStore from "../../store/cartStore";
import { useNavigate } from "react-router-dom";
import NotificationDropdown from "../Notification/Notification";

const Header = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

   const { user, isLoggedIn, logout } = useAuthStore();
   const { cartNotification } = useCartStore();
    const navigate = useNavigate();

    const handleLogout = () => {
      logout();
      navigate("/user/login");
    };

  return (
    <div className="flex justify-between items-center p-4 sticky top-0 z-50">
      <div className="hover:cursor-pointer">
        <Link to="/">
          <img className="h-14 w-auto object-contain" src={logo} alt="logo" />
        </Link>
      </div>
      <Navbar />
      <NotificationDropdown />
      <Link
        to="/cart"
        className="ml-4 p-2 rounded-md text-gray-400 hover:text-gray-500 hover:bg-gray-100 focus:outline-none "
      >
        <ShoppingCart className="h-6 w-6" />
        {cartNotification > 0 && (
          <span className="absolute top-2 right-3 bg-red-600 text-black text-xs w-5 h-5 flex justify-center items-center rounded-full">
            {cartNotification}
          </span>
        )}
      </Link>

      <div className="ml-4 sm:hidden">
        <button
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          className="inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-gray-500 hover:bg-gray-100 focus:outline-none "
        >
          {mobileMenuOpen ? (
            <X className="block h-6 w-6" />
          ) : (
            <Menu className="block h-6 w-6" />
          )}
        </button>
      </div>

      {mobileMenuOpen && (
        <div className="sm:hidden">
          <div className="pt-2 pb-3 space-y-1">
            {/* Fixed mobile menu items instead of mapping categories */}
            <Link
              to="/"
              className="bg-indigo-50 border-transparent hover:border-gray-500 focus:outline-none text-indigo-700 block pl-3 pr-4 py-2 border-l-4 text-base font-medium "
            >
              Home
            </Link>
            {!isLoggedIn ? (
              <>
                <Link
                  to="/user/login"
                  className="bg-indigo-50 border-indigo-500 text-indigo-700 block pl-3 pr-4 py-2 border-l-4 text-base font-medium"
                >
                  Login
                </Link>
                <Link
                  to="/user/signup"
                  className="bg-indigo-50 border-indigo-500 text-indigo-700 block pl-3 pr-4 py-2 border-l-4 text-base font-medium"
                >
                  Signup
                </Link>
              </>
            ) : (
              <>
                {user?.role === "ADMIN" && (
                  <>
                    <Link
                      to="/dashboard"
                      className="border-transparent text-gray-500 hover:bg-gray-50 hover:border-gray-300 hover:text-gray-700 block pl-3 pr-4 py-2 border-l-4 text-base font-medium"
                    >
                      Dashboard
                    </Link>
                    <Link
                      to="/product/add-product"
                      className="border-transparent text-gray-500 hover:bg-gray-50 hover:border-gray-300 hover:text-gray-700 block pl-3 pr-4 py-2 border-l-4 text-base font-medium"
                    >
                      Add Product
                    </Link>
                    <Link
                      to="/user/all-users"
                      className="border-transparent text-gray-500 hover:bg-gray-50 hover:border-gray-300 hover:text-gray-700 block pl-3 pr-4 py-2 border-l-4 text-base font-medium"
                    >
                      View Users
                    </Link>
                  </>
                )}
                <Link
                  to="/user/profile"
                  className="border-transparent text-gray-500 hover:bg-gray-50 hover:border-gray-300 hover:text-gray-700 block pl-3 pr-4 py-2 border-l-4 text-base font-medium"
                >
                  Profile
                </Link>
                <Link
                  to="/user/order"
                  className="border-transparent text-gray-500 hover:bg-gray-50 hover:border-gray-300 hover:text-gray-700 block pl-3 pr-4 py-2 border-l-4 text-base font-medium"
                >
                  Orders
                </Link>
                <li
                  onClick={handleLogout}
                  className="border-transparent text-gray-500 hover:bg-gray-50 hover:border-gray-300 hover:text-gray-700 block pl-3 pr-4 py-2 border-l-4 text-base font-medium"
                >
                  Logout
                </li>
              </>
            )}
            <SearchBar />
          </div>
        </div>
      )}
    </div>
  );
};

export default Header;
