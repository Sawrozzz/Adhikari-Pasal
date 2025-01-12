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
      <ul className="flex gap-10 text-white">
        <li className="cursor-pointer hover:text-gray-900">
          <Link to="/">Home</Link>
        </li>
        <li className="cursor-pointer hover:text-gray-900">
          <Link to="/cart">Cart</Link>
        </li>

        {!isLoggedIn ? (
          <>
            <li className="cursor-pointer hover:text-gray-900">
              <Link to="/login">Login</Link>
            </li>
            <li className="cursor-pointer hover:text-gray-900">
              <Link to="/signup">Signup</Link>
            </li>
          </>
        ) : (
          <>
            {/* Show extra links for Admin users */}
            {user?.role === "ADMIN" && (
              <>
                <li className="cursor-pointer hover:text-gray-900">
                  <Link to="/add-product">Add Products</Link>
                </li>
                <li className="cursor-pointer hover:text-gray-900">
                  <Link to="/all-users">View Users</Link>
                </li>
              </>
            )}
            <li className="cursor-pointer hover:text-gray-900">
             <Link to="/profile">Profile</Link>
            </li>
            <li className="cursor-pointer hover:text-gray-900" onClick={handleLogout}>
              Logout
            </li>
          </>
        )}
      </ul>
    </nav>
  );
};

export default Navbar;
