import mongoose from "mongoose";

const productSchema = new mongoose.Schema({
  name: String,
  category:String,
  price: Number,
  description: String,
  discountedPrice: Number,
  discount: {
    type: Number,
    default: 0,
  },
  image: String,
});

const Product = mongoose.model("product", productSchema);
export default Product;