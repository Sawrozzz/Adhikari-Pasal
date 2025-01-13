import mongoose from "mongoose";

const productSchema = new mongoose.Schema({
    name:String,
    price:Number,
    description:String,
    discount:{
     type:Number,
     default:0
    },
    image:String,
})

const Product = mongoose.model("product", productSchema);
export default Product;