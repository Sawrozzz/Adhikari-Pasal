import { Order } from "../model/order-model.js";

export const displayAllOrders = async (req, res) => {
  try {
    const orders = await Order.find();

    console.log(orders);

    return res.status(200).json({
      message: "Orders reterive successfully",
      success: true,
      orders: orders,
    });
  } catch (error) {
    console.error("Error while displaying your orders", error.message);
  }
};
