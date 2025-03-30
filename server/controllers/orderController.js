import { Order } from "../model/order-model.js";

//code to display all orders
export const displayAllOrders = async (req, res) => {
  try {
    const orders = await Order.find()
      .populate("user", "fullName")
      .populate("order_data", "totalPrice");

    // console.log(orders);

    const totalSumOfTotalPrices = orders.reduce((sum, order) => {
      return sum + (order.order_data.totalPrice || 0);
    }, 0);

    const orderCount = orders.length;

    return res.status(200).json({
      message: "Orders reterive successfully",
      success: true,
      orders: orders,
      orderCount: orderCount,
      totalSumOfTotalPrices: totalSumOfTotalPrices,
    });
  } catch (error) {
    console.error("Error while displaying your orders", error.message);
  }
};

//code to update individual orders, [order status]
export const updateOrders = async (req, res) => {
  const { status } = req.body;
  const orderId = req.params.id;

  console.log(status, "and", orderId);
  try {
    const validStatus = [
      "created",
      "paid and processing",
      "shipping",
      "delivered",
    ];
    if (!validStatus.includes(status)) {
      return res
        .status(400)
        .json({ message: "Invalid status", success: false });
    }

    const order = await Order.findById(orderId);
    // console.log(order);
    if (!order) {
      return res
        .status(404)
        .json({ message: "Order not found", success: false });
    }

    // Update order status
    order.status = status;
    await order.save();

    return res.status(200).json({
      message: "Order update successfully",
      updatedOrder: order,
      success: true,
    });
  } catch (error) {
    console.error("Error occurs while updating order", error.message);
    return res.status(500).json({
      message: "Server error",
      success: false,
    });
  }
};

//code to delete individual orders

export const deleteOrders = async (req, res) => {
  const orderId = req.params.id;
  console.log(orderId);
  try {
    const order = await Order.findByIdAndDelete(orderId);
    if (!order) {
      return res.status(404).json({ message: "Order not found" });
    }

    return res.status(200).json({ message: "Order deleted successfully" });
  } catch (error) {
    return res.status(500).json({
      message: "Server Error while deleting order",
      success: false,
      error: error.message,
    });
  }
};
