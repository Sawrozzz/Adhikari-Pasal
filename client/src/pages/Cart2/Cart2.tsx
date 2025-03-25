import { useEffect, useState } from "react";
import useCartStore from "../../store/cartStore";
import useAuthStore from "../../store/authStore";
import { Link, useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Cart2 = () => {
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
  const handleIncreaseQuantity = (cartId, currentQuantity) => {
    const newQuantity = currentQuantity + 1;
    updateCartQuantity(user.email, cartId, newQuantity);
  };

  //decrease quantity

  const handleDecreaseQuantity = (cartId, currentQuantity) => {
    const newQuantity = currentQuantity > 1 ? currentQuantity - 1 : 1;
    updateCartQuantity(user.email, cartId, newQuantity);
  };

  //to delete cart
  const handleRemoveCart = async (productId) => {
    if (!user || !user.email) {
      toast.error(
        "You must sign up and log in to your account to delete cart."
      );
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
    <div className="max-w-5xl max-md:max-w-xl mx-auto p-4">
      <h1 className="text-2xl font-bold text-slate-900">Your Cart</h1>
      <div className="grid md:grid-cols-3 gap-10 mt-8">
        <div className="md:col-span-2 space-y-4">
          {cart.map((item, index) => (
            <div className="flex gap-4 bg-white px-4 py-6 rounded-md shadow-[0_2px_12px_-3px_rgba(61,63,68,0.3)]">
              <div className="flex gap-4">
                <div className="w-28 h-28 max-sm:w-24 max-sm:h-24 shrink-0">
                  <img
                    src={item.product?.image}
                    alt={item.product?.name}
                    className="w-full h-full object-contain"
                  />
                </div>

                <div className="flex flex-col gap-4">
                  <div>
                    <h3 className="text-sm sm:text-base font-semibold text-slate-900">
                      {item.product?.name}
                    </h3>
                    <p className="text-sm font-semibold text-slate-500 mt-2 flex items-center gap-2">
                      Color:{" "}
                      <span className="inline-block w-5 h-5 rounded-md bg-[#ac7f48]"></span>
                    </p>
                  </div>

                  <div className="mt-auto flex items-center gap-3">
                    <button
                      type="button"
                      onClick={() =>
                        handleDecreaseQuantity(item._id, item.quantity)
                      }
                      className="flex items-center justify-center w-5 h-5 bg-slate-400 outline-none rounded-full"
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="w-2 fill-white"
                        viewBox="0 0 124 124"
                      >
                        <path
                          d="M112 50H12C5.4 50 0 55.4 0 62s5.4 12 12 12h100c6.6 0 12-5.4 12-12s-5.4-12-12-12z"
                          data-original="#000000"
                        ></path>
                      </svg>
                    </button>
                    <span className="font-semibold text-sm leading-[18px]">
                      {item.quantity}
                    </span>
                    <button
                      type="button"
                      onClick={() =>
                        handleIncreaseQuantity(item._id, item.quantity)
                      }
                      className="flex items-center justify-center w-5 h-5 bg-slate-800 outline-none rounded-full"
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="w-2 fill-white"
                        viewBox="0 0 42 42"
                      >
                        <path
                          d="M37.059 16H26V4.941C26 2.224 23.718 0 21 0s-5 2.224-5 4.941V16H4.941C2.224 16 0 18.282 0 21s2.224 5 4.941 5H16v11.059C16 39.776 18.282 42 21 42s5-2.224 5-4.941V26h11.059C39.776 26 42 23.718 42 21s-2.224-5-4.941-5z"
                          data-original="#000000"
                        ></path>
                      </svg>
                    </button>
                  </div>
                </div>
              </div>
              <div className="ml-auto flex flex-col">
                <div className="flex items-start gap-4 justify-end">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="w-4 h-4 cursor-pointer fill-slate-400 hover:fill-pink-600 inline-block"
                    viewBox="0 0 64 64"
                  >
                    <path
                      d="M45.5 4A18.53 18.53 0 0 0 32 9.86 18.5 18.5 0 0 0 0 22.5C0 40.92 29.71 59 31 59.71a2 2 0 0 0 2.06 0C34.29 59 64 40.92 64 22.5A18.52 18.52 0 0 0 45.5 4ZM32 55.64C26.83 52.34 4 36.92 4 22.5a14.5 14.5 0 0 1 26.36-8.33 2 2 0 0 0 3.27 0A14.5 14.5 0 0 1 60 22.5c0 14.41-22.83 29.83-28 33.14Z"
                      data-original="#000000"
                    ></path>
                  </svg>

                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="w-4 h-4 cursor-pointer fill-slate-400 hover:fill-red-600 inline-block"
                    viewBox="0 0 24 24"
                    onClick={() => handleRemoveCart(item._id)}
                  >
                    <path
                      d="M19 7a1 1 0 0 0-1 1v11.191A1.92 1.92 0 0 1 15.99 21H8.01A1.92 1.92 0 0 1 6 19.191V8a1 1 0 0 0-2 0v11.191A3.918 3.918 0 0 0 8.01 23h7.98A3.918 3.918 0 0 0 20 19.191V8a1 1 0 0 0-1-1Zm1-3h-4V2a1 1 0 0 0-1-1H9a1 1 0 0 0-1 1v2H4a1 1 0 0 0 0 2h16a1 1 0 0 0 0-2ZM10 4V3h4v1Z"
                      data-original="#000000"
                    ></path>
                    <path
                      d="M11 17v-7a1 1 0 0 0-2 0v7a1 1 0 0 0 2 0Zm4 0v-7a1 1 0 0 0-2 0v7a1 1 0 0 0 2 0Z"
                      data-original="#000000"
                    ></path>
                  </svg>
                </div>
                <h3 className="text-sm sm:text-base font-semibold text-slate-900 mt-auto">
                  RS.{item.discountedPrice}
                </h3>
              </div>
            </div>
          ))}
        </div>
        <div className="bg-white rounded-md px-4 py-6 h-max shadow-[0_2px_12px_-3px_rgba(61,63,68,0.3)]">
          <ul className="text-slate-900 font-medium space-y-4">
            <li className="flex flex-wrap gap-4 text-sm">
              Subtotal{" "}
              <span className="ml-auto font-semibold">
                Rs.
                {cart.reduce((total, item) => total + item.discountedPrice, 0)}
              </span>
            </li>
            <hr className="border-slate-300" />
            <li className="flex flex-wrap gap-4 text-sm font-semibold">
              Total{" "}
              <span className="ml-auto">
                Rs.
                {cart.reduce((total, item) => total + item.discountedPrice, 0)}
              </span>
            </li>
          </ul>

          <div className="mt-8 space-y-2">
            <button
              type="button"
              className="text-sm px-4 py-2.5 w-full font-semibold tracking-wide bg-slate-800 hover:bg-slate-900 text-white rounded-md"
            >
              Buy Now
            </button>
            <button
              type="button"
              className="text-sm px-4 py-2.5 w-full font-semibold tracking-wide bg-transparent hover:bg-slate-100 text-slate-900 border border-slate-300 rounded-md"
            >
              <Link to="/"> Continue Shopping</Link>
            </button>
          </div>

          <div className="mt-4 flex flex-wrap justify-center gap-4">
            <img
              src="data:image/jpeg;base64,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"
              alt="khalti"
              className="w-10 object-contain"
            />
            <img
              src="data:image/png;base64,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"
              alt="esewa"
              className="w-8 object-contain rounded-md"
            />
            <img
              src="data:image/png;base64,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"
              alt="fonepay"
              className="w-12 object-contain rounded-md"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Cart2;
