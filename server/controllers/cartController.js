import User from "../model/user-model.js";
import { cartItem } from "../model/cart-model.js";
import Product from "../model/product-model.js";


//code to add product to cart
export const addToCart = async (req, res) => {
  try {
    const { email, quantity } = req.body;
    const productId = req.params.id;

    //find user
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({
        message: "User not found",
        success: false,
      });
    }
    // Find product
    const product = await Product.findById(productId);
    if (!product)
      return res
        .status(404)
        .json({ message: "Product not found", success: false });

    let cartItemEntry = await cartItem.findOne({ product: productId });
    if (cartItemEntry) {
      cartItemEntry.quantity += quantity || 1;
      cartItemEntry.price = product.price * cartItemEntry.quantity;
      cartItemEntry.discountedPrice = product.discountedPrice
        ? Math.floor(product.discountedPrice * cartItemEntry.quantity)
        : 0;
      await cartItemEntry.save();
    } else {
      //create new cart item
      cartItemEntry = new cartItem({
        product: productId,
        quantity: quantity || 1,
        price: product.price * (quantity || 1),
        discountedPrice: product.discountedPrice
          ? Math.floor(product.discountedPrice * (quantity || 1))
          : 0,
      });
      await cartItemEntry.save();
    }
    //add to user's cart if not already added

    if (!user.cart.includes(cartItemEntry._id)) {
      user.cart.push(cartItemEntry._id);
      await user.save();
    }
    res.status(200).json({
      message: "Product added to cart",
      cart: cartItemEntry,
      success: true,
    });
  } catch (error) {
    console.error("Error while adding to cart", error.message);
    res.status(500).json({
      message: "Fail to add to cart",
      success: false,
    });
  }
};

//code to display cart
export const displayCart = async (req, res) => {
  try {
    const { email } = req.query;

    if (!email) {
      return res.status(400).json({
        message: "Login first to see your carts",
        success: false,
      });
    }

    const user = await User.findOne({ email }).populate({
      path: "cart",
      populate: {
        path: "product",
        model: "product",
      },
    });
    if (!user) {
      return res.status(404).json({
        message: "User not found",
        success: false,
      });
    }
    const cartCount = user.cart.length;
    // Return the cart with populated product details
    return res.status(200).json({
      message: "Cart fetched successfully",
      success: true,
      cart: user.cart,
      cartCount: cartCount,
    });
  } catch (error) {
    console.error("Error while diplaying Carts", error.message);
    res.status(500).json({
      message: "Server Error while displaying carts",
      success: false,
    });
  }
};
//code to delete cart
export const deleteCart = async (req, res) => {
  try {
    const { email } = req.body;
    const cartId = req.params.id;

    if (!email || !cartId) {
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

    // console.log("user",user);
    // Find and delete the cart item for this product
    const cartDelete = await cartItem.findOneAndDelete({
      _id: cartId,
    });

    // console.log(cartItem);

    if (!cartDelete) {
      return res.status(404).json({
        message: "Cart item not found",
        success: false,
      });
    }

    // Remove cartItem reference from the user's cart array
    user.cart = user.cart.filter(
      (cartItemId) => cartItemId.toString() !== cartId.toString()
    );
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
