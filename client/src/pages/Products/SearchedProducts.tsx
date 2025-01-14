import { useEffect } from "react";
import { useLocation } from "react-router-dom";
import useProductStore from "../../store/productStore";

const SearchedProducts = () => {
  const { searchResults, searchProducts } = useProductStore();
const location = useLocation();
 const getQueryParam = (param) => {
   const urlParams = new URLSearchParams(location.search);
   return urlParams.get(param); // Get the 'category' query parameter
 };

 const category = getQueryParam("category");

  useEffect(() => {
    console.log(category);
    
    if (category) {
      searchProducts(category);
    }
  }, [category, searchProducts]);

  return (
    <div>
      <h2 className="text-xl font-bold mb-4">
        Search Results for "{category}"
      </h2>
      {searchResults && searchResults.length === 0 ? (
        <p>No products found</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
          {searchResults.map((product) => (
            <div className=" overflow-x-auto mt-2" key={product.id}>
              <div className="flex gap-4 px-5">
                <div className="w-72 p-4 bg-white border rounded-lg shadow-md flex-shrink-0">
                  <div className="relative">
                    <span className="absolute top-2 left-2 bg-purple-500 text-white text-xs font-bold px-2 py-1 rounded-full">
                      Category ({product.category})
                    </span>
                    <img
                      src={product.image}
                      alt="Product Image"
                      className="w-full h-36 object-cover rounded-md"
                    />
                  </div>
                  <div className="mt-4">
                    <h3 className="text-md font-semibold text-gray-800">
                      {product.name}
                    </h3>
                    <div className="flex items-center justify-between mt-2">
                      <span className="text-lg font-bold text-gray-900">
                        {" "}
                        Rs {product.discountedPrice}
                      </span>
                    </div>
                    <div className="flex gap-2">
                      <p className="text-sm text-gray-700 line-through">
                        Rs {product.price}
                      </p>
                      <p className="text-xs text-gray-900">{product.discount}%</p>
                    </div>
                    <p className="text-sm text-gray-500 mt-1">
                     {product.description}
                    </p>
                    <div className="mt-4 flex gap-2">
                      <button className="flex-1 py-2 px-4 border border-gray-300 text-gray-700 rounded-md hover:bg-gray-100">
                        Add to Cart
                      </button>
                      <button className="flex-1 py-2 px-4 bg-purple-600 text-white rounded-md hover:bg-purple-700">
                        Buy Now
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default SearchedProducts;
