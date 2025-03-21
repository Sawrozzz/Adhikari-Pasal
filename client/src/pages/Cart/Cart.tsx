import { useEffect, useState } from "react";
import useCartStore from "../../store/cartStore";
import useAuthStore from "../../store/authStore";
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Cart = () => {
  const {
    cart,
    displayCart,
    cartCount,
    removeCart,
    loading,
    updateCartQuantity,
    resetCartNotification,
    totalDiscountedPrice,
  } = useCartStore();
  const { user } = useAuthStore();
  const navigate = useNavigate();
  useEffect(() => {
    if (user?.email) {
      displayCart(user.email);
      resetCartNotification();
    }
  }, [user, displayCart, resetCartNotification]);

  //increase quantity
    const handleIncreaseQuantity = (
      cartId,
      currentQuantity,
    ) => {
      const newQuantity = currentQuantity + 1;
      updateCartQuantity(user.email, cartId, newQuantity);
    };

    //decrease quantity

    const handleDecreaseQuantity = (
      cartId,
      currentQuantity,
    ) => {
      const newQuantity = currentQuantity > 1 ? currentQuantity - 1 : 1;
      updateCartQuantity(user.email, cartId, newQuantity);
    };

  //to delete cart
  const handleRemoveCart = async (productId) => {
    if (!user || !user.email) {
      toast.error("You must sign up and log in to your account to delete cart.");
      navigate("/user/login");
      return;
    }
    const email = user.email;
    if (!productId) {
      console.error("Product ID is undefined");
      return;
    }
    removeCart(email, productId);
    navigate("/cart");
    toast.error("Cart removed successfully");
    // alert("cart deleted successfully")
  };

  return (
    <div className="flex flex-col sm:flex-row justify-between px-2">
      <ToastContainer />
      <section className="flex flex-col gap-8 px-2 w-full sm:w-[60%] h-[45rem] overflow-y-scroll scrollbar-thin scrollbar-thumb-rounded scrollbar-thumb-gray-900 scrollbar-track-gray-100">
        <h2 className="text-2xl font-mono">Total Cart: {cartCount}</h2>
        <div className="grid grid-cols-1 gap-y-10 gap-x-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 xl:gap-x-8">
          {cart.map((item, index) => (
            <div
              key={index}
              title={item.product?.name}
              className="group relative bg-white rounded-xl shadow-md overflow-hidden transition-all duration-300 hover:shadow-xl transform hover:-translate-y-1"
            >
              {/* Product Image with Overlay */}
              <div className="relative aspect-w-1 aspect-h-1 bg-gray-200 group-hover:opacity-90 h-44 overflow-hidden">
                <img
                  src={item.product?.image}
                  alt={item.product?.name}
                  className="w-full h-full object-center  object-cover transition-transform duration-300 group-hover:scale-105"
                />
            
              </div>

              {/* Product Details */}
              <div className="p-3">
                <div className="flex justify-between items-start">
                  <div>
                    <p className="text-sm font-medium text-indigo-600">
                      {item.product?.category}
                    </p>
                    <h3 className="mt-1 text-base font-semibold text-gray-900 line-clamp-2">
                      {item.product?.name}
                    </h3>
                  </div>
                </div>

                <div className="mt-1 flex items-center">
                  <p className="text-sm text-gray-500 line-through mr-2">
                    Rs.{item.price}
                  </p>
                  <p className="text-lg font-bold text-gray-900">
                    RS.{item.discountedPrice}
                  </p>
                </div>

                <div className="mt-4 flex flex-col space-y-2">
                  <div className="flex justify-between items-center">
                    <span>Quantity: {item.quantity}</span>
                    <div className="flex space-x-2">
                      <span
                        onClick={() =>
                          handleIncreaseQuantity(item._id, item.quantity)
                        }
                        className="border border-black w-8 h-8 text-center rounded-full text-xl cursor-pointer hover:bg-purple-800"
                        title="Add One"
                      >
                        +
                      </span>
                      <span
                        onClick={() =>
                          handleDecreaseQuantity(item._id, item.quantity)
                        }
                        className="border border-black w-8 h-8 text-center rounded-full text-xl cursor-pointer hover:bg-purple-800"
                        title="Remove One"
                      >
                        -
                      </span>
                    </div>
                  </div>
                  <button
                    onClick={() => handleRemoveCart(item._id)}
                    disabled={loading}
                    className="cursor-pointer w-full bg-red-600 border border-transparent rounded-lg py-3 px-4 flex items-center justify-center text-sm font-medium text-white hover:bg-red-700 focus:outline-none transition-colors duration-200"
                  >
                    {loading ? "Deleting..." : "Delete Cart"}
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>
      <div className="flex sm:hidden items-center justify-center my-4">
        <div className="border-t-2 border-black w-full"></div>
      </div>
      <div className="hidden sm:flex items-center justify-center">
        <div className="border-l-2 border-black h-full"></div>
      </div>
      <section className="flex flex-col w-full sm:w-[35%] mt-8 sm:mt-0">
        <div className="flex mt-5 mb-7">
          <h3 className="w-2/4 text-2xl">Total Amount to be Paid:</h3>
          <h3 className="font-semibold text-2xl text-green-700">
            Rs.{cart.reduce((total, item) => total + item.discountedPrice, 0)}
          </h3>
        </div>
        <h3 className="border w-full sm:w-1/3 h-10 bg-green-500 flex justify-center items-center rounded hover:bg-green-600 cursor-pointer">
          Buy & Checkout
        </h3>
      </section>
    </div>
  );
};

export default Cart;
