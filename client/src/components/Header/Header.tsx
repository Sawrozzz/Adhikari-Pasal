import { Link } from "react-router-dom";
import Navbar from "../NavBar/Navbar";
import SearchBar from "../SearchBar/SearchBar";
const Header = () => {
  return (
    <div className="flex justify-between bg-gray-400 p-4">
      <div className="hover:cursor-pointer">
        <Link to="/">Adhikari Pasal</Link>
      </div>
      <SearchBar />
      <Navbar />

    </div>
  );
};

export default Header;
