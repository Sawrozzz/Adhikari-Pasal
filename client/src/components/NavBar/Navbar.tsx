import { Link } from "react-router-dom";
import useAuthStore from "../../store/authStore";
import { useNavigate } from "react-router-dom";

const Navbar = () => {
  const { user, isLoggedIn, logout } = useAuthStore();
  const navigate = useNavigate();

  const handleLogout = () =>{
    logout();
    navigate('/');
  }

  return (
    <nav>
      <ul className="flex  gap-10 text-purple-500">
        <li className="cursor-pointer hover:text-purple-900">
          <Link to="/">Home</Link>
        </li>

        {!isLoggedIn ? (
          <>
            <li className="cursor-pointer hover:text-blue-500">
              <Link to="/user/login">Login</Link>
            </li>
            <li className="cursor-pointer hover:text-blue-500">
              <Link to="/user/signup">Signup</Link>
            </li>
          </>
        ) : (
          <>
            {/* Show extra links for Admin users */}
            {user?.role === "ADMIN" && (
              <>
                <li className="cursor-pointer hover:text-blue-500">
                  <Link to="/product/add-product">Add Products</Link>
                </li>
                <li className="cursor-pointer hover:text-blue-500">
                  <Link to="/user/all-users">View Users</Link>
                </li>
              </>
            )}
            <li className="cursor-pointer hover:text-blue-500">
              <Link to="/cart">My Cart</Link>
            </li>
            <li className="cursor-pointer hover:text-blue-500">
              <Link to="/user/profile">Profile</Link>
            </li>

            <li
              className="cursor-pointer hover:text-blue-500"
              onClick={handleLogout}
            >
              Logout
            </li>
          </>
        )}
      </ul>
    </nav>
  );
};

export default Navbar;
