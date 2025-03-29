import mongoose from "mongoose";
const orderSchema = mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "user",
      required: true,
    },
    payment_method: {
      type: String,
      required: true,
      default: "khalti",
    },

    order_data: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "PurchasedItem",
    },

    status: {
      type: String,
      required: true,
      enum: ["created", "paid and processing", "shipping", "delivered"],
      default: "created",
    },
    address: String,
  },
  {
    timestamps: true,
  }
);

export const Order = mongoose.model("order", orderSchema);
