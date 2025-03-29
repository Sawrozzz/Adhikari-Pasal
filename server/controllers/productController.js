import Product from "../model/product-model.js";
import User from "../model/user-model.js";

//code to create product
export const create = async (req, res) => {
  const { name, price, category, description, discount } = req.body;

  const defaultImage =
    "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQinI_44p5jN05YioLyPBhn_1j5tsl7q85rfA&s";

  try {
    const actualImage = req.file ? req.file.path : defaultImage;
    const discountedPrice = discount ? price - (price * discount) / 100 : price;

    const newProduct = await Product.create({
      name,
      category,

      price: Number(price),
      discountedPrice: Number(discountedPrice),
      description,
      discount: Number(discount),
      image: actualImage,
    });

    const savedProduct = await newProduct.save();

    res.status(201).json({
      message: "Product created successfully",
      product: savedProduct,
      success: true,
    });
  } catch (error) {
    console.error("Error while creating product:", error.message);
    res
      .status(500)
      .json({ message: "Failed to create product", error, success: false });
  }
};

//code to get all products
export const allProducts = async (req, res) => {
  try {
    const products = await Product.find();
    // if(!products.length){
    //   return res.status(400).json({
    //     message:"No products found",
    //     success:false,
    //   });
    // }
    const productLength = products.length;
    res.status(200).json({
      message: "Products retrieved successfully",
      success: true,
      data: products,
      productLength:productLength,
    });
  } catch (error) {
    console.log("Error during getting all products", error.message);
    res.status(500).json({
      message: "Server Error",
      success: false,
    });
  }
};

export const searchProducts = async (req, res) => {
  try {
    const { category } = req.query;

    const query = category
      ? { category: { $regex: category, $options: "i" } } // Case-insensitive search
      : {};

    const products = await Product.find(query);

    if (!products.length) {
      return res.status(404).json({
        message: "No products found for the specified category",
        success: false,
      });
    }

    res.status(200).json({
      message: "Products found successfully",
      success: true,
      data: products,
    });
  } catch (error) {
    console.error(
      "Error during searching products with this category:",
      error.message
    );
    res.status(500).json({
      message: "Server Error",
      success: false,
    });
  }
};

export const removeProduct = async (req, res) => {
  try {
    const { email } = req.body;
    const productId = req.params.id;

    if (!productId) {
      return res.status(400).json({
        message: "Product ID is missing",
        success: false,
      });
    }

    const product = await Product.findById(productId);
    if (!product) {
      return res.status(404).json({
        message: "Product not found",
        success: false,
      });
    }

    const user = await User.findOne({ email });
    if (!user) {
      return res.status(404).json({
        message: "Login as Admin to delete products",
        success: false,
      });
    }
    const productList = await Product.findByIdAndDelete(productId);
    return res.status(200).json({
      message: "Product removed successfully",
      success: true,
      productList: productList,
    });
  } catch (error) {
    console.error("Error while deleting product", error.message);
    return res.status(500).json({
      message: "Error while removing product",
      success: false,
    });
  }
};
