import { useEffect, useState } from "react";
import useCartStore from "../../store/cartStore";
import useAuthStore from "../../store/authStore";
import { useNavigate } from "react-router-dom";

const Cart = () => {
  const {
    cart,
    displayCart,
    cartCount,
    removeCart,
    loading,
    updateCartQuantity,
  } = useCartStore();
  const { user } = useAuthStore();
  const navigate = useNavigate();
  useEffect(() => {
    if (user?.email) {
      displayCart(user.email);
    }
  }, [user, displayCart]);

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
      alert("You must sign up and log in to your account to delete cart.");
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
    // alert("cart deleted successfully")
  };

  return (
    <div className="flex flex-col sm:flex-row justify-between px-2">
      <section className="flex flex-col gap-8 px-2 w-[60%] h-[45rem] overflow-y-scroll scrollbar-thin scrollbar-thumb-rounded scrollbar-thumb-gray-900 scrollbar-track-gray-100">
        <h2 className="text-2xl font-mono">Total Cart: {cartCount}</h2>
        <div className="flex flex-col gap-4 sm:flex-row flex-wrap ">
          {cart.map((item, index) => (
            <div
              key={index}
              className="lg:w-[30%] rounded-md overflow-hidden bg-slate-200"
            >
              <div className="flex justify-center items-center">
                <img
                  className="w-36 h-36 object-cover rounded"
                  src={item.product?.image}
                  alt={item.product?.name}
                />
              </div>
              <h3 className="text-xl text-black text-center">{item.name}</h3>
              <div className="flex flex-col px-5 py-3 bg-purple-500">
                <h4 className="text-lg">Price: {item.price}</h4>
                <h2>Discounted Price: {item.discountedPrice}</h2>
                <h4 className="flex justify-between mb-2">
                  <span>Quantity: {item.quantity}</span>
                  <span
                    onClick={() =>
                      handleIncreaseQuantity(
                        item._id,
                        item.quantity,
                    
                      )
                    }
                    className=" border border-black w-8 h-8 text-center rounded-full text-xl cursor-pointer hover:bg-purple-800"
                  >
                    +
                  </span>
                  <span
                    onClick={() =>
                      handleDecreaseQuantity(
                        item._id,
                        item.quantity,
                  
                      )
                    }
                    className=" border border-black w-8 h-8 text-center rounded-full text-xl cursor-pointer hover:bg-purple-800"
                  >
                    -
                  </span>
                </h4>
                <button
                  onClick={() => handleRemoveCart(item._id)}
                  disabled={loading}
                  className="bg-red-600 px-2 py-1 rounded hover:bg-red-700"
                >
                  {loading ? "Deleting..." : "Delete Cart"}
                </button>
              </div>
            </div>
          ))}
        </div>
      </section>
      <div class="flex items-center justify-center sm:flex-row">
        <div class="border-l-2 border-black  h-[100%]"></div>
      </div>
      <section className="flex flex-col w-[35%]">
        <div class="flex mt-5 mb-7">
          <h3 class="w-2/4 text-2xl">Total Amount to be Paid:</h3>
          <h3 class="font-semibold text-2xl text-green-700">
            Rs{" "}
            {cart.reduce(
              (total, item) => total + item.discountedPrice * item.quantity,
              0
            )}
          </h3>
        </div>
        <h3 className="border w-1/3 h-10 bg-green-500 flex justify-center items-center rounded hover:bg-green-600 cursor-pointer">
          Buy & Chekout{" "}
        </h3>
      </section>
    </div>
  );
};

export default Cart;
