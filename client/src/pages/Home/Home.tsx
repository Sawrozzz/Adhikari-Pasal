import { useState, useEffect } from "react";
import useProductStore from "../../store/productStore";

const Home = () => {
  const { allProducts, fetchAllProducts } = useProductStore();

  // State for the carousel
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  // Carousel images (replace with dynamic URLs if needed)
  const carouselImages = [
    "https://imgs.search.brave.com/hEat3q-7SYkCbWn-NrMYRhFEwe55bjjWPrerjazY8XA/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly9tZWRp/YS5pc3RvY2twaG90/by5jb20vaWQvMTMy/NDg0NzI0Mi9waG90/by9wYWlyLW9mLXdo/aXRlLWxlYXRoZXIt/dHJhaW5lcnMtb24t/d2hpdGUtYmFja2dy/b3VuZC5qcGc_cz02/MTJ4NjEyJnc9MCZr/PTIwJmM9MmViSGZC/aHZDSjlfeTRZelJz/VXFpMFNlVldYLW9x/cmFHVEJDWjlsbUZP/UT0",
    "https://imgs.search.brave.com/SmpFdCFr2MHi2gNlIXOCAfXWx9yP7MaVoquJX4HG4XI/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly9jZG4u/cGl4YWJheS5jb20v/cGhvdG8vMjAxNS8x/MS8yMC8wMy81My9w/YWNrYWdlLTEwNTIz/NzBfNjQwLmpwZw",
    "https://imgs.search.brave.com/_HZoNx5IthN7o30H3SVygilNVPCtywmaWePrPkZHngk/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly9tZWRp/YS5nZXR0eWltYWdl/cy5jb20vaWQvMTUz/MDcyMTM5L3Bob3Rv/L2EtaHAtZG00LTMw/MDBlYS1sYXB0b3At/cGhvdG9ncmFwaGVk/LWR1cmluZy1hLXN0/dWRpby1zaG9vdC1m/b3Itb2ZmaWNpYWwt/d2luZG93cy1tYWdh/emluZS5qcGc_cz02/MTJ4NjEyJnc9MCZr/PTIwJmM9eW4tcDhw/Q25QQy1oRUQtdS1V/U3NpcVFna1RGMWho/RFNfMkxjT0habkJM/az0",
  ];

  useEffect(() => {
    fetchAllProducts();

    // Automatically change the carousel image every 2 seconds
    const interval = setInterval(() => {
      setCurrentImageIndex((prevIndex) =>
        prevIndex === carouselImages.length - 1 ? 0 : prevIndex + 1
      );
    }, 2000);

    return () => clearInterval(interval); // Cleanup interval on unmount
  }, [fetchAllProducts, carouselImages.length]);

  return (
    <div className="h-screen flex flex-col">
      {/* Carousel Section */}
      <div className="h-1/2 w-full">
        <div className="relative w-full h-full overflow-hidden">
          <img
            src={carouselImages[currentImageIndex]}
            alt={`Slide ${currentImageIndex + 1}`}
            className=" w-full h-full object-cover transition-all duration-700 ease-in-out"
          />
          {/* Dots for navigation */}
          <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex space-x-2">
            {carouselImages.map((_, index) => (
              <span
                key={index}
                className={`w-3 h-3 rounded-full ${
                  index === currentImageIndex ? "bg-purple-600" : "bg-white"
                }`}
              ></span>
            ))}
          </div>
        </div>
      </div>

      {/* Products Section */}
      <div className="h-1/2 overflow-x-auto mt-2">
        <div className="flex gap-4 px-5">
          {allProducts.map((product, index) => (
            <div
              key={product.id || index}
              className="w-72 p-4 bg-white border rounded-lg shadow-md flex-shrink-0"
            >
              <div className="relative">
                <span className="absolute top-2 left-2 bg-purple-500 text-white text-xs font-bold px-2 py-1 rounded-full">
                  Category ({product.category})
                </span>
                <img
                  src={product.image}
                  alt={product.name || "Product Image"}
                  className="w-full h-36 object-cover rounded-md"
                />
              </div>
              <div className="mt-4">
                <h3 className="text-md font-semibold text-gray-800">
                  {product.name}
                </h3>
                <div className="flex items-center justify-between mt-2">
                  <span className="text-lg font-bold text-gray-900">{`Rs ${product.discountedPrice}`}</span>
                </div>
                <div className="flex gap-2">
                  <p className="text-sm text-gray-700 line-through">
                    Rs{product.price}
                  </p>
                  <p className="text-xs text-gray-900">{product.discount}%</p>
                </div>
                <p className="text-sm text-gray-500 mt-1">
                  {product.description || "No Description available"}
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
          ))}
        </div>
      </div>
    </div>
  );
};

export default Home;
