const Cart = () => {
  return (
    <div className="font-sans w-full min-h-screen flex flex-col lg:flex-row items-start px-5 lg:px-20 py-10 lg:py-20 gap-10">
      <div className="w-full lg:w-[30%] rounded-md overflow-hidden">
        <div className="h-80 flex justify-center items-center bg-gray-200">
          <img
            className="h-[15rem] w-[20rem] object-contain"
            src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQfsKcLtcDvagrqCxPXwH7LG9Nddg1K83l6tQ&s"
            alt="image"
          />
        </div>
        <div className="w-full flex justify-between px-5 py-4 bg-gray-100">
          <h3 className="text-2xl">Shoes</h3>
          <div className="flex items-center gap-2">
            <i className="w-7 h-7 bg-white flex rounded-full items-center justify-center font-bold">
              +
            </i>
            <div className="px-2 py-1 rounded-md bg-white text-black">01</div>
            <i className="w-7 h-7 bg-white flex rounded-full items-center justify-center font-bold">
              -
            </i>
          </div>
        </div>
        <div className="flex items-center justify-between px-5 py-3 bg-gray-100">
          <h4 className="text-lg">Net Total</h4>
          <h2 className="text-lg">Rs 2000</h2>
        </div>
      </div>
      <div className="w-full lg:w-[70%]">
        <h3 className="text-xl">Price Breakdown</h3>
        <div className="px-5 lg:px-10 mt-5">
          <div className="flex mt-2">
            <h4 className="w-1/3">Actual Price</h4>
            <h4>Rs 5000</h4>
          </div>
          <div className="flex mt-2">
            <h4 className="w-1/3">Discount Percentage</h4>
            <h4>10%</h4>
          </div>
          <div className="flex mt-2">
            <h4 className="w-1/3">Discounted Price</h4>
            <h4>Rs 4500</h4>
          </div>
          <div className="flex mt-2">
            <h4 className="w-1/3">Platform Fee</h4>
            <h4>Rs 20</h4>
          </div>
          <div className="flex mt-2">
            <h4 className="w-1/3">Shipping Fee</h4>
            <h4>FREE</h4>
          </div>
        </div>
        <div className="w-full h-[1px] bg-black mt-10"></div>
        <div className="flex mt-5">
          <h3 className="w-1/3 text-xl">Total Amount</h3>
          <h3 className="font-semibold text-xl text-purple-700">Rs 4520</h3>
        </div>
        <div className="mt-5 flex flex-col lg:flex-row gap-5">
          <button className="w-full lg:w-1/4 bg-purple-500 text-white py-2 rounded-md hover:bg-purple-800">
            Buy Now
          </button>
          <button
            type="submit"
            className=" w-full lg:w-1/4 py-2 px-4 border bg-gray-300 border-gray-300 text-gray-700 rounded-md hover:bg-red-500"
          >
            Delete
          </button>
        </div>
      </div>
    </div>
  );
};

export default Cart;
