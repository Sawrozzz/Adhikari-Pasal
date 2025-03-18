import { useState } from "react";
import { useNavigate } from "react-router-dom";
import useProductStore from "../../store/productStore";
import { Search } from "lucide-react";

const SearchBar = () => {
  const [query, setQuery] = useState("");
  const { searchProducts } = useProductStore();
  const navigate = useNavigate();

  const handleSearch = async (e) => {
    e.preventDefault();
    if (query.trim()) {
      await searchProducts(query.trim()); // Trigger the search in the Zustand store
      navigate(`/product/search?category=${query.trim()}`);
    }
  };

  const handleClear = () => {
    setQuery("");
  };

  return (
    <>
      <div
        className="hidden sm:flex items-center flex-1 max-w-xs ml-4"
        style={{ display: "block" }}
      >
        <div className="w-full">
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center">
              {query && (
                <button
                  onClick={handleClear}
                  className="text-gray-500 hover:text-gray-800 px-2 cursor-pointer"
                >
                  ✕
                </button>
              )}
              <Search
                className="h-5 w-5 text-red-400 cursor-pointer"
                onClick={handleSearch}
              />
            </div>
            <input
              type="text"
              placeholder="Search products..."
              className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md leading-5 bg-white placeholder-gray-500 focus:outline-none focus:placeholder-gray-400 focus:ring-1 focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
              value={query} // Bind the input's value to the query state
              onChange={(e) => setQuery(e.target.value)}
            />
          </div>
        </div>
      </div>
    </>
  );
};

export default SearchBar;
