import { Link } from "react-router-dom";

const Navbar = () => {
  return (
    <nav>
      <ul className="flex gap-10 text-white">
        <li className="cursor-pointer hover:text-gray-900">
          <Link to="/">Home</Link>
        </li>
        <li className="cursor-pointer hover:text-gray-900">
          <Link to="/cart">Cart</Link>
        </li>
        <li className="cursor-pointer hover:text-gray-900">
          <Link to="/login">Login</Link>
        </li>
        <li className="cursor-pointer hover:text-gray-900">
          <Link to="/signup">Signup</Link>
        </li>
      </ul>
    </nav>
  );
};

export default Navbar;
