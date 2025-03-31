import { Link } from "react-router-dom";
import useAuthStore from "../../store/authStore";
import { useNavigate } from "react-router-dom";
import SearchBar from "../SearchBar/SearchBar";
import { Bell } from "lucide-react";


const Navbar = () => {
  const { user, isLoggedIn, logout } = useAuthStore();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/user/login");
  };

  return (
    <nav className="hidden sm:ml-6 sm:flex sm:space-x-8">
      {/* Fixed navbar items instead of mapping categories */}
      <SearchBar />
      <Link
        to="/"
        className="border-transparent text-gray-500 hover:border-gray-300 hover:text-gray-700 inline-flex items-center px-1 pt-1 border-b-2 text-sm font-medium transition duration-200"
      >
        Home
      </Link>
      {!isLoggedIn ? (
        <>
          <Link
            to="/user/login"
            className="border-transparent text-gray-500 hover:border-gray-300 hover:text-gray-700  inline-flex items-center px-1 pt-1 border-b-2 text-sm font-medium transition duration-200"
          >
            Login
          </Link>
          <Link
            to="/user/signup"
            className="border-transparent text-gray-500 hover:border-gray-300 hover:text-gray-700 inline-flex items-center px-1 pt-1 border-b-2 text-sm font-medium"
          >
            SignUp
          </Link>
        </>
      ) : (
        <>
          {user?.role === "ADMIN" && (
            <>
              <Link
                to="/dashboard"
                className="border-transparent text-gray-500 hover:border-gray-300 hover:text-gray-700 inline-flex items-center px-1 pt-1 border-b-2 text-sm font-medium transition duration-200"
              >
                Dashboard
              </Link>
              <Link
                to="/product/add-product"
                className="border-transparent text-gray-500 hover:border-gray-300 hover:text-gray-700 inline-flex items-center px-1 pt-1 border-b-2 text-sm font-medium transition duration-200"
              >
                Add Products
              </Link>
              <Link
                to="/user/all-users"
                className="border-transparent text-gray-500 hover:border-gray-300 hover:text-gray-700 inline-flex items-center px-1 pt-1 border-b-2 text-sm font-medium transition duration-200"
              >
                View Users
              </Link>
            </>
          )}
          <Link
            to="/user/profile"
            className="border-transparent text-gray-500 hover:border-gray-300 hover:text-gray-700 inline-flex items-center px-1 pt-1 border-b-2 text-sm font-medium transition duration-200"
          >
            Profile
          </Link>
          <Link
            to="/user/order"
            className="border-transparent text-gray-500 hover:border-gray-300 hover:text-gray-700 inline-flex items-center px-1 pt-1 border-b-2 text-sm font-medium transition duration-200"
          >
            Your Orders
          </Link>
      
          <div
            onClick={handleLogout}
            className="cursor-pointer border-transparent text-gray-500 hover:border-gray-300 hover:text-gray-700 inline-flex items-center px-1 pt-1 border-b-2 text-sm font-medium transition duration-200"
          >
            Logout
          </div>
        </>
      )}
    </nav>
  );
};

export default Navbar;
