import useProductStore from "../../store/productStore";
import { useState, useRef } from "react";
import { useNavigate } from "react-router-dom";

const AddProducts = () => {
  const { createProduct,loading, error } = useProductStore();
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: "",
    category:"",
    price: "",
    discount: "",
    description: "",
    image: null,
  });

  const fileInputRef = useRef(null); // Create a reference for the file input

  const handleChange = (e) => {
    const { name, value, files } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: files ? files[0] : value,
    }));
  };

  const handleClearImage = () => {
    setFormData((prev) => ({
      ...prev,
      image: null, // Clear the image from formData
    }));
    if (fileInputRef.current) {
      fileInputRef.current.value = ""; // Reset the file input using the ref
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const productData = new FormData();
    productData.append("name", formData.name);
    productData.append("category", formData.category);
    productData.append("price", formData.price);
    productData.append("description", formData.description);
    productData.append("discount", formData.discount);
    if (formData.image) {
      productData.append("image", formData.image);
    }
    const result = await createProduct(productData);
    console.log(result);
    navigate("/");
  };

  return (
    <div className="max-w-lg mx-auto my-8 p-6 bg-white shadow-md rounded-md">
      <h2 className="text-2xl font-bold text-center mb-4">Add Product</h2>
      <form
        className="space-y-4"
        onSubmit={handleSubmit}
        encType="multipart/form-data"
      >
        <div>
          <label className="block font-medium mb-2">Product Name</label>
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            required
            className="w-full px-4 py-1 border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-indigo-200"
          />
        </div>
        <div>
          <label className="block font-medium mb-2">Product Category</label>
          <input
            type="text"
            name="category"
            value={formData.category}
            onChange={handleChange}
            required
            className="w-full px-4 py-1 border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-indigo-200"
          />
        </div>

        <div>
          <label className="block font-medium mb-2">Price</label>
          <input
            type="number"
            name="price"
            value={formData.price}
            onChange={handleChange}
            required
            className="w-full px-4 py-1 border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-indigo-200"
          />
        </div>
        <div>
          <label className="block font-medium mb-2">Discount(%)</label>
          <input
            type="number"
            name="discount"
            value={formData.discount}
            onChange={handleChange}
            className="w-full px-4 py-1 border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-indigo-200"
          />
        </div>

        <div>
          <label className="block font-medium mb-2">Description</label>
          <textarea
            name="description"
            required
            value={formData.description}
            onChange={handleChange}
            rows="3"
            className="w-full px-4 py-1 border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-indigo-200"
          ></textarea>
        </div>

        <div>
          <label className="block font-medium mb-2">Image</label>
          <input
            type="file"
            name="image"
            ref={fileInputRef} // Attach ref to the file input
            onChange={handleChange}
            className="w-full px-4 py-1 border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-indigo-200"
          />
          {formData.image && (
            <div className="mt-2">
              <p>Selected file: {formData.image.name}</p>
              <button
                type="button"
                onClick={handleClearImage}
                className="mt-2 text-white bg-red-600 py-1 px-1 rounded-md "
              >
                Remove Image
              </button>
            </div>
          )}
        </div>
          <button
            type="submit"
            className="w-full bg-indigo-600 text-white py-1 px-4 rounded-md hover:bg-indigo-700 focus:outline-none focus:ring focus:ring-indigo-200"
          >
            {loading ? "Adding Product.....":"Add Product"}
          </button>
      </form>
    </div>
  );
};

export default AddProducts;
