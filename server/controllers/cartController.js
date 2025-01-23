import User from "../model/user-model.js";
import Product from "../model/product-model.js";

// const findProductToCart = async(req, res)=>{
//     let products = await Product.find()
// }

export const addToCart = async (req, res) => {
  try {
    let email = req.body.email;
    const productId = req.params.id;
    if (!email || !productId) {
      return res.status(400).json({
        message: "Email or Product ID is missing",
        success: false,
      });
    }
    console.log("Email:", email);
    console.log("Product ID:", productId);
    let user = await User.findOne({ email: email });
    if (!user) {
      return res.status(404).json({
        message: "User not found",
        success: false,
      });
    }
    let product = await Product.findById(productId);
    if (!product) {
      return res.status(404).json({
        message: "Product not found",
        success: false,
      });
    }

    user.cart.push(productId);
    await user.save();
    return res.status(200).json({
      message: "Product added to cart successfully",
      success: true,
      product: product,
    });
  } catch (error) {
    console.log("Error during adding on carts", error.message);
    res.status(500).json({
      message: "Error while adding on cart",
      success: false,
    });
  }
};

export const displayCart = async (req, res) => {
  try {
    const { email } = req.query;

    if (!email) {
      return res.status(400).json({
        message: "Login first to see your carts",
        success: false,
      });
    }

    const user = await User.findOne({ email }).populate("cart");
    if (!user) {
      return res.status(404).json({
        message: "User not found",
        success: false,
      });
    }
    // Return the cart with populated product details
    return res.status(200).json({
      message: "Cart fetched successfully",
      success: true,
      cart: user.cart,
    });
  } catch (error) {
    console.error("Error while diplaying Carts", error.message);
    res.status(500).json({
      message: "Server Error while displaying carts",
      success: false,
    });
  }
};

export const deleteCart = async (req, res) => {
  try {
    const { email, productId } = req.body;
    if (!email || !productId) {
      return res.status(400).json({
        message: "Email or Product ID is missing",
        success: false,
      });
    }
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(404).json({
        message: "User not found",
        success: false,
      });
    }
    user.cart = user.cart.filter((id) => id.toString() !== productId);
    await user.save();

    return res.status(200).json({
      message: "Product removed from cart successfully",
      success: true,
      cart: user.cart,
    });
  } catch (error) {
    console.error("Error while deleting Carts", error.message);
    res.status(500).json({
      message: "Server Error while deleting carts",
      success: false,
    });
  }
};
