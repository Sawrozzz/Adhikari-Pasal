import { useEffect, useState } from "react";
import useCartStore from "../../store/cartStore";
import useAuthStore from "../../store/authStore";
import { useNavigate } from "react-router-dom";

const Cart = () => {
  const { cart, displayCart, cartCount, removeCart, loading } = useCartStore();
  const { user } = useAuthStore();
  const navigate = useNavigate();
  useEffect(() => {
    displayCart(user.email);
  }, [user]);

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

  const calculateTotalAmount = () => {
    return cart.reduce((total, item) => total + item.price * item.quantity, 0);
  };

  return (
    <div className="flex flex-col sm:flex-row justify-between px-2">
      <section className="flex flex-col gap-8 px-2 w-[60%] h-[45rem] overflow-y-scroll scrollbar-thin scrollbar-thumb-rounded scrollbar-thumb-gray-900 scrollbar-track-gray-100">
        <h2 className="text-2xl font-mono">Total Cart: {cartCount}</h2>
        <div className="flex flex-col gap-4 sm:flex-row flex-wrap ">
          {cart.map((item, index) => (
            <div key={index} className="lg:w-[30%] rounded-md overflow-hidden">
              <div className="flex justify-center items-center">
                <img
                  className="w-36 h-36 object-cover rounded"
                  src={item.product?.image}
                  alt={item.product?.name}
                />
              </div>
              <h3 className="text-xl text-black text-center">{item.name}</h3>
              <div className="flex items-center justify-between px-5 py-3 bg-purple-500">
                <h4 className="text-lg">Price: {item.price}</h4>
                <h2>Discounted Price: {item.discountedPrice}</h2>
                <h4>Quantity: {item.quantity}</h4>
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
        <h2>Price Breakdown</h2>
        <div class="flex mt-5">
          <h3 class="w-1/3 text-xl">Total Amount</h3>
          <h3 class="font-semibold text-xl text-green-700">Rs 3000</h3>
        </div>
        <h3>Buy Now</h3>
      </section>
    </div>
  );
};

export default Cart;
