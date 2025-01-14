import { useState } from "react";
import { useNavigate } from "react-router-dom";

import useProductStore from "../../store/productStore";


const SearchBar = () => {
     const [query, setQuery] = useState("");
     const {searchProducts} = useProductStore();
     const navigate = useNavigate();
   
     const handleSearch = async(e) =>{
      e.preventDefault();
      if(query.trim()){
        await searchProducts(query.trim()); // Trigger the search in the Zustand store
        navigate(`/product/search?category=${query.trim()}`)
      }
     }

       const handleClear = () => {
         setQuery("");
       };
  return (
    <div className="flex items-center w-full max-w-md mx-auto bg-gray-100 rounded-full shadow-md ">
      <input
        type="text"
        value={query} // Bind the input's value to the query state
        onChange={(e) => setQuery(e.target.value)}
        placeholder="Search for products..."
        className="flex-1 bg-transparent outline-none px-4 py-2 text-gray-800"
      />

      {query && (
        <button
          onClick={handleClear}
          className="text-gray-500 hover:text-gray-800 px-2"
        >
          ✕
        </button>
      )}

      <button
        onClick={handleSearch}
        className="bg-purple-600 text-white px-4 py-2 rounded-full hover:bg-purple-700"
      >
        Search
      </button>
    </div>
  );
};

export default SearchBar;
