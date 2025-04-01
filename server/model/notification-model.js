import mongoose from "mongoose";

const notificationSchema = mongoose.Schema(
  {
    message: String,

    order: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "order",
    },
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "user",
    },
    cartItem: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "cartItem",
    },
    product: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "cartItem",
    },
    payment: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "payment",
    },
    purchasedItem: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "PurchasedItem",
    },
  },
  {
    timestamps: true,
  }
);

const Notification = mongoose.model("notification", notificationSchema);

export default Notification;
