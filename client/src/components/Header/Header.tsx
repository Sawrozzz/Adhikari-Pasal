import { Link } from "react-router-dom";
import Navbar from "../NavBar/Navbar";
const Header = () => {
  return (
    <div className="flex justify-around bg-gray-400 p-4">
      <div className="hover:cursor-pointer">
        <Link to="/">Adhikari Pasal</Link>
      </div>
      <Navbar />
    </div>
  );
};

export default Header;
