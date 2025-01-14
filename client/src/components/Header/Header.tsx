import { Link } from "react-router-dom";
import Navbar from "../NavBar/Navbar";
import SearchBar from "../SearchBar/SearchBar";
import logo from '../../assets/logo.png' 
const Header = () => {
  return (
    <div className="flex justify-between items-center p-4 sticky top-0 z-50">
      <div className="hover:cursor-pointer">
        <Link to="/">
          <img className="h-14 w-auto object-contain"  src={logo} alt="logo"/>
        </Link>
      </div>
      <SearchBar />
      <Navbar />
    </div>
  );
};

export default Header;
