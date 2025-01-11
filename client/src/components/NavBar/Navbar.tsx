import { Link } from "react-router-dom";
import { useState } from "react";
import useAuthStore from "../../store/authStore";

const Navbar = () => {
  const { user, isLoggedIn, logout } = useAuthStore();

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
                  <Link to="/view-users">View Users</Link>
                </li>
              </>
            )}
            <li className="cursor-pointer hover:text-gray-900" onClick={logout}>
              Logout
            </li>
          </>
        )}
      </ul>
    </nav>
  );
};

export default Navbar;
