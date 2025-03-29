import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  fullName: String,
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  address: String,
  phone: Number,
  picture: String,
  role: {
    type: String,
    enum: ["ADMIN", "NORMAL"],
    default: "NORMAL",
  },
  cart: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "cartItem",
    },
  ],
  orders: {
    type: Array,
    default: [],
  },
});
const User = mongoose.model("user", userSchema);
export default User;
