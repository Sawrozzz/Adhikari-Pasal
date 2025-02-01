import { useState } from "react";
import { Link } from "react-router-dom";
import useAuthStore from "../../store/authStore";
import useCartStore from "../../store/cartStore";
import { useNavigate } from "react-router-dom";
import {
  FaHome,
  FaSignInAlt,
  FaUserPlus,
  FaShoppingCart,
  FaSignOutAlt,
  FaTachometerAlt,
  FaPlusCircle,
  FaUsers,
  FaBars,
} from "react-icons/fa";

const Navbar = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false); // State for mobile menu visibility
  const { user, isLoggedIn, logout } = useAuthStore();
  const { cartNotification } = useCartStore();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/user/login");
  };

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen((prev) => !prev); // Toggle the mobile menu state
  };

  return (
    <nav className="p-5  text-black">
      <div className="flex justify-between items-center">
        

        {/* Mobile menu toggle (Hamburger icon) */}
        <div className="block md:hidden">
          <button className="text-black text-2xl" onClick={toggleMobileMenu}>
            <FaBars /> {/* Hamburger icon */}
          </button>
        </div>

        {/* Desktop Navigation */}
        <ul className="hidden md:flex gap-10 text-purple-500">
          <li className="cursor-pointer hover:text-purple-900">
            <Link to="/">
              <FaHome className="inline-block mr-2" />
              Home
            </Link>
          </li>

          {!isLoggedIn ? (
            <>
              <li className="cursor-pointer hover:text-blue-500">
                <Link to="/user/login">
                  <FaSignInAlt className="inline-block mr-2" />
                  Login
                </Link>
              </li>
              <li className="cursor-pointer hover:text-blue-500">
                <Link to="/user/signup">
                  <FaUserPlus className="inline-block mr-2" />
                  Signup
                </Link>
              </li>
            </>
          ) : (
            <>
              {/* Show extra links for Admin users */}
              {user?.role === "ADMIN" && (
                <>
                  <li className="cursor-pointer hover:text-blue-500">
                    <Link to="/dashboard">
                      <FaTachometerAlt className="inline-block mr-2" />
                      DashBoard
                    </Link>
                  </li>
                  <li className="cursor-pointer hover:text-blue-500">
                    <Link to="/product/add-product">
                      <FaPlusCircle className="inline-block mr-2" />
                      Add Products
                    </Link>
                  </li>
                  <li className="cursor-pointer hover:text-blue-500">
                    <Link to="/user/all-users">
                      <FaUsers className="inline-block mr-2" />
                      View Users
                    </Link>
                  </li>
                </>
              )}

              <li className="relative cursor-pointer hover:text-blue-500">
                <Link to="/cart">
                  <FaShoppingCart className="inline-block mr-2" />
                  Cart
                  {cartNotification > 0 && (
                    <span className="absolute -top-2 -right-3 bg-red-600 text-black text-xs w-5 h-5 flex justify-center items-center rounded-full">
                      {cartNotification}
                    </span>
                  )}
                </Link>
              </li>

              <li className="cursor-pointer hover:text-blue-500">
                <Link to="/user/profile">
                  <FaUsers className="inline-block mr-2" />
                  Profile
                </Link>
              </li>

              <li
                className="cursor-pointer hover:text-blue-500"
                onClick={handleLogout}
              >
                <FaSignOutAlt className="inline-block mr-2" />
                Logout
              </li>
            </>
          )}
        </ul>
      </div>

      {/* Mobile Navigation (hidden on md and up) */}
      {isMobileMenuOpen && (
        <ul className="md:hidden">
          <li className="cursor-pointer hover:text-purple-900">
            <Link to="/">
              <FaHome className="inline-block mr-2" />
              Home
            </Link>
          </li>
          {!isLoggedIn ? (
            <>
              <li className="cursor-pointer hover:text-blue-500">
                <Link to="/user/login">
                  <FaSignInAlt className="inline-block mr-2" />
                  Login
                </Link>
              </li>
              <li className="cursor-pointer hover:text-blue-500">
                <Link to="/user/signup">
                  <FaUserPlus className="inline-block mr-2" />
                  Signup
                </Link>
              </li>
            </>
          ) : (
            <>
              {user?.role === "ADMIN" && (
                <>
                  <li className="cursor-pointer hover:text-blue-500">
                    <Link to="/dashboard">
                      <FaTachometerAlt className="inline-block mr-2" />
                      DashBoard
                    </Link>
                  </li>
                  <li className="cursor-pointer hover:text-blue-500">
                    <Link to="/product/add-product">
                      <FaPlusCircle className="inline-block mr-2" />
                      Add Products
                    </Link>
                  </li>
                  <li className="cursor-pointer hover:text-blue-500">
                    <Link to="/user/all-users">
                      <FaUsers className="inline-block mr-2" />
                      View Users
                    </Link>
                  </li>
                </>
              )}
              <li className="relative cursor-pointer hover:text-blue-500">
                <Link to="/cart">
                  <FaShoppingCart className="inline-block mr-2" />
                  Cart
                  {cartNotification > 0 && (
                    <span className="absolute -top-2 -right-3 bg-red-600 text-black text-xs w-5 h-5 flex justify-center items-center rounded-full">
                      {cartNotification}
                    </span>
                  )}
                </Link>
              </li>

              <li className="cursor-pointer hover:text-blue-500">
                <Link to="/user/profile">
                  <FaUsers className="inline-block mr-2" />
                  Profile
                </Link>
              </li>

              <li
                className="cursor-pointer hover:text-blue-500"
                onClick={handleLogout}
              >
                <FaSignOutAlt className="inline-block mr-2" />
                Logout
              </li>
            </>
          )}
        </ul>
      )}
    </nav>
  );
};

export default Navbar;
