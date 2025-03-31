import {
  initializeKhaltiPayment,
  verifyKhaltiPayment,
} from "../config/khalti.js";
import Payment from "../model/payment-model.js";
import PurchasedItem from "../model/purchased-item-model.js";
import { cartItem } from "../model/cart-model.js";
import { Order } from "../model/order-model.js";
import User from "../model/user-model.js";

export const initializeKhalti = async (req, res) => {
  try {
    const { itemIds, website_url } = req.body;

    if (!Array.isArray(itemIds) || itemIds.length === 0) {
      return res.status(400).json({
        success: false,
        message: "itemIds must be a non-empty array",
      });
    }
    const userId = req.user.userId;
    const user = await User.findById(userId)
      .select("-password")
      .select("-orders");
    if (!user) {
      return res.status(400).send({
        success: false,
        message: "User data not found",
      });
    }

    let totalPrice = 0;
    const purchasedItemsData = [];
    const productNames = [];

    for (const itemId of itemIds) {
      const itemData = await cartItem
        .findOne({
          _id: itemId,
        })
        .populate("product");
      if (!itemData) {
        console.error(`Item with ID ${itemId} not found`);
        continue; // Skip this item and continue with the next one
      }

      purchasedItemsData.push(itemId);
      totalPrice += itemData.discountedPrice;
      productNames.push(itemData.product.name);
    }

    if (purchasedItemsData.length === 0) {
      return res.status(400).json({
        success: false,
        message: "No valid items found",
      });
    }

    const purchasedItemData = await PurchasedItem.create({
      items: itemIds,
      paymentMethod: "khalti",
      totalPrice: totalPrice *100,
    });



    const purchaseOrderName = productNames.join(" and ");

    const paymentInitiate = await initializeKhaltiPayment({
      amount: totalPrice * 100, // amount should be in paisa (Rs * 100)
      purchase_order_id: purchasedItemData._id, // use the _id of the created PurchasedItem
      purchase_order_name: `${purchaseOrderName} order`,
      return_url: `${process.env.BACKEND_URI}/payment/complete-khalti-payment`, // it can be even managed from frontend
      website_url,
    });

    console.log("Purchased Data",purchasedItemData)

    // const totalPriceCentToRupee = (PurchasedItem.totalPrice) / 100;

    

    const order = await Order.create({
      user: userId,
      payment_method: "khalti",
      order_data: purchasedItemData._id,
      status: "created",
      address: user.address,
    });

    await User.findByIdAndUpdate(
      userId,
      {
        $push: { orders: order._id },
      },
      {
        new: true,
      }
    );

    res.status(200).json({
      success: true,
      purchasedItemData,
      purchaseOrderName,
      payment: paymentInitiate,
      order: order,
    });
  } catch (error) {
    console.error("Error while initializing Khalti payment", error);
    res.status(500).json({
      success: false,
      message: "An error occurred",
    });
  }
};

export const verifyPayment = async (req, res) => {
  const { pidx, amount, purchase_order_id, transaction_id } = req.query;

  try {
    const paymentInfo = await verifyKhaltiPayment(pidx);

    // If payment is successful, then check the record if matched
    if (paymentInfo?.status !== "Completed") {
      return res.status(400).json({
        success: false,
        message: "Incomplete information: Payment status is not completed",
        paymentInfo,
      });
    }

    const purchasedItemData = await PurchasedItem.findOne({
      _id: purchase_order_id,
      totalPrice: amount,
    });
    if (!purchasedItemData) {
      return res.status(400).send({
        success: false,
        message: "Purchased data not found",
      });
    }

    // Check for duplicate transactionId
    const existingPayment = await Payment.findOne({
      transactionId: transaction_id,
    });
    if (existingPayment) {
      return res.status(400).json({
        success: false,
        message: "Duplicate transaction ID",
      });
    }

    // Updating purchase record
    await PurchasedItem.findByIdAndUpdate(purchase_order_id, {
      $set: {
        status: "completed",
      },
    });

    // Create a new payment record
    const paymentData = await Payment.create({
      pidx,
      transactionId: transaction_id,
      productId: purchase_order_id,
      amount,
      dataFromVerificationReq: paymentInfo,
      apiQueryFromUser: req.query,
      paymentGateway: "khalti",
      status: "success",
    });

    const redirectUrl = "http://localhost:5173/payment-success";

    return res.redirect(redirectUrl);

    // Send success response
    // window.location.href = "http://localhost:5173";
    // res.json({
    //   success: true,
    //   message: "Payment Successful with Khalti, Thank You",
    //   paymentData,
    // });
  } catch (error) {
    console.error("Error while verifying payment", error.message);
    res.status(500).json({
      message: "Error occurs",
      success: false,
    });
  }
};
