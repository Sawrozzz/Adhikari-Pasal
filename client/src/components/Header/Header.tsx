import Navbar from "../NavBar/Navbar";
const Header = () => {
  return (
    <div className="flex justify-around bg-gray-400 p-4">
      <div className="hover:cursor-pointer">Logo</div>
      <Navbar />
    </div>
  );
};

export default Header;
