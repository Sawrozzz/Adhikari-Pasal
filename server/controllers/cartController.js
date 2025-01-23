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
    let user = await User.findOne({ email:email});
        if (!user) {
      return res.status(404).json({
        message: "User not found",
        success: false,
      });
    }
    user.cart.push(productId);
    await user.save();
     return res.status(200).json({
       message: "Product added to cart successfully",
       success: true,
     });
  } catch (error) {
    console.log("Error during adding on carts", error.message);
    res.status(500).json({
      message: "Error while adding on cart",
      success: false,
    });
  }
};
