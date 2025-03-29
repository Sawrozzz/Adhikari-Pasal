import { useState, useEffect } from "react";
import useProductStore from "../../store/productStore";
import useCartStore from "../../store/cartStore";
import useAuthStore from "../../store/authStore";
import { useNavigate, Link } from "react-router-dom";
import { Eye, Trash2, ShoppingCart } from "lucide-react";
import ProductDetailModal from "../../components/ProductModel/ProductModel";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Home = () => {
  const { allProducts, fetchAllProducts, removeProduct, loading } = useProductStore();
  const { addToCart } = useCartStore();
  const { isLoggedIn, user } = useAuthStore();
  const [products, setProducts] = useState(allProducts);
  //for opening and closing product detail page
  const [hoveredProduct, setHoveredProduct] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(null);

  const navigate = useNavigate();

  const handleOpenModal = (product) => {
    setSelectedProduct(product);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setSelectedProduct(null);
  };

  // handing add to cart
  const handleOnAddToCart = async (productId: string, quantity = 1) => {
    
    if (!isLoggedIn || !user || !user.email) {
      toast.error("You must sign up and log in to your account to add products.");
      navigate("/user/login");
      return;
    }

    const email = user.email;
    if (!productId) {
      console.error("Product ID is undefined");
      return;
    }

    await addToCart(email, productId, quantity);
    toast.success('Product added to cart successfully !')
  };

  const handleRemoveProduct = async (productId: string) => {
    if (!user || !user.email) {
      toast.error("You must sign up and log in to your account to delete cart.");
      navigate("/user/login");
      return;
    }

    if (user.role === "NORMAL") {
      toast.error("Only Admin can remove the product");
      navigate("/");
      return;
    }
    const email = user.email;

    if (!productId) {
      console.error("Product ID is undefined");
      return;
    }
    removeProduct(productId, email);
    
    toast.error("Product deleted successfully")
  };

   useEffect(() => {
     const paymentInitiated = localStorage.getItem("paymentInitiated");
     if (paymentInitiated === "true") {
       toast.success("Payment was successful!");
       localStorage.removeItem("paymentInitiated"); // Clear the flag
     }
   }, []);


 useEffect(() => {
    fetchAllProducts();
  }, [fetchAllProducts]);

  useEffect(() => {
    setProducts(allProducts);
  }, [allProducts]);

  return (
    <div className="h-screen flex flex-col">
      <ToastContainer />
      {/* Hero Section */}

      <div className="bg-indigo-700">
        <div className="max-w-7xl mx-auto py-16 px-4 sm:py-24 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-4xl font-extrabold text-white sm:text-5xl md:text-6xl">
              <span className="block">Spring Collection 2025</span>
              <span className="block text-indigo-200">Up to 50% Off</span>
            </h1>
            <p className="mt-3 max-w-md mx-auto text-base text-indigo-200 sm:text-lg md:mt-5 md:text-xl md:max-w-3xl">
              Discover our latest arrivals and refresh your style this season.
            </p>
            <div className="mt-5 max-w-md mx-auto sm:flex sm:justify-center md:mt-8">
              <div className="rounded-md shadow">
                <Link
                  to="/"
                  className="w-full flex items-center justify-center px-8 py-3 border border-transparent text-base font-medium rounded-md text-indigo-600 bg-white hover:bg-gray-50 md:py-4 md:text-lg md:px-10"
                >
                  Shop Now
                </Link>
              </div>
              <div className="mt-3 rounded-md shadow sm:mt-0 sm:ml-3">
                <Link
                  to="/"
                  className="w-full flex items-center justify-center px-8 py-3 border border-transparent text-base font-medium rounded-md text-white bg-indigo-500 hover:bg-indigo-600 md:py-4 md:text-lg md:px-10"
                >
                  View Deals
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
      {/* Products Section */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-5">
        <div className="grid grid-cols-1 gap-y-10 gap-x-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 xl:gap-x-8">
          {products.map((product) => (
            <div
              key={product.id}
              className="group relative bg-white rounded-xl shadow-md overflow-hidden transition-all duration-300 hover:shadow-xl transform hover:-translate-y-1"
              onMouseEnter={() => setHoveredProduct(product.id)}
              onMouseLeave={() => setHoveredProduct(null)}
            >
              {/* Product Image with Overlay */}
              <div className="relative aspect-w-1 aspect-h-1 bg-gray-200 group-hover:opacity-90 h-64 overflow-hidden">
                <img
                  src={product.image}
                  alt={product.name}
                  className="w-full h-full object-center object-cover transition-transform duration-300 group-hover:scale-105"
                />

                {/* Overlay buttons on hover */}
                <div
                  className={`absolute inset-0 bg-black bg-opacity-20 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300`}
                >
                  <div className="flex space-x-2">
                    <button
                      onClick={() => handleOpenModal(product)}
                      className="p-2 rounded-full bg-white text-gray-800 shadow-lg hover:bg-indigo-100 transition-colors duration-200"
                    >
                      <Eye className="h-5 w-5" />
                    </button>
                  </div>
                </div>
              </div>

              {/* Product Details */}
              <div className="p-3">
                <div className="flex justify-between items-start">
                  <div>
                    <p className="text-sm font-medium text-indigo-600">
                      {product.category}
                    </p>
                    <h3 className="mt-1 text-base font-semibold text-gray-900 line-clamp-2 ">
                      {product.name}
                    </h3>
                  </div>
                </div>

                <div className="mt-1 flex items-center">
                  <p className="text-sm text-gray-500 line-through mr-2">
                    Rs.{product.price.toFixed()}
                  </p>
                  <p className="text-lg font-bold text-gray-900">
                    RS.{product.discountedPrice.toFixed()}
                  </p>
                </div>

                {/* CTA Button - changes on hover */}

                {user && user.role === "ADMIN" ? (
                  <>
                    <div className="mt-4">
                      <button
                        onClick={() => handleRemoveProduct(product._id)}
                        className=" cursor-pointer w-full bg-red-600 border border-transparent rounded-lg py-3 px-4 flex items-center justify-center text-sm font-medium text-white hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transition-colors duration-200"
                      >
                        <Trash2 className="h-5 w-5 mr-2" />
                        Delete Product
                      </button>
                    </div>
                    <div className="mt-4">
                      <button
                        onClick={() => {
                          handleOnAddToCart(product._id);
                        }}
                        className="cursor-pointer w-full bg-indigo-600 border border-transparent rounded-lg py-3 px-4 flex items-center justify-center text-sm font-medium text-white hover:bg-indigo-700 focus:outline-none  transition-colors duration-200"
                      >
                        <ShoppingCart className="h-5 w-5 mr-2" />
                        Add to cart
                      </button>
                    </div>
                  </>
                ) : (
                  <div className="mt-4">
                    <button
                      onClick={() => {
                        handleOnAddToCart(product._id);
                      }}
                      className="cursor-pointer w-full bg-indigo-600 border border-transparent rounded-lg py-3 px-4 flex items-center justify-center text-sm font-medium text-white hover:bg-indigo-700 focus:outline-none  transition-colors duration-200"
                    >
                      <ShoppingCart className="h-5 w-5 mr-2" />
                      Add to cart
                    </button>
                  </div>
                )}
              </div>
            </div>
          ))}
          <ProductDetailModal
            product={selectedProduct}
            isOpen={isModalOpen}
            onClose={handleCloseModal}
          />
        </div>
      </div>
      {/* Footer */}
      <footer className="bg-white">
        <div className="max-w-7xl mx-auto py-12 px-4 overflow-hidden sm:px-6 lg:px-8">
          <nav
            className="-mx-5 -my-2 flex flex-wrap justify-center"
            aria-label="Footer"
          >
            <div className="px-5 py-2">
              <Link
                to="/"
                className="text-base text-gray-500 hover:text-gray-900"
              >
                About
              </Link>
            </div>
            <div className="px-5 py-2">
              <Link
                to="/"
                className="text-base text-gray-500 hover:text-gray-900"
              >
                Blog
              </Link>
            </div>
            <div className="px-5 py-2">
              <Link
                to="/"
                className="text-base text-gray-500 hover:text-gray-900"
              >
                Contact
              </Link>
            </div>
            <div className="px-5 py-2">
              <Link
                to="/"
                className="text-base text-gray-500 hover:text-gray-900"
              >
                Careers
              </Link>
            </div>
            <div className="px-5 py-2">
              <Link
                to="/"
                className="text-base text-gray-500 hover:text-gray-900"
              >
                Shipping
              </Link>
            </div>
            <div className="px-5 py-2">
              <Link
                to="/"
                className="text-base text-gray-500 hover:text-gray-900"
              >
                Returns
              </Link>
            </div>
          </nav>
          <p className="mt-8 text-center text-base text-gray-400">
            &copy; 2025 AdiPasal, Inc. All rights reserved.
          </p>
        </div>
      </footer>
    </div>
  );
};

export default Home;
