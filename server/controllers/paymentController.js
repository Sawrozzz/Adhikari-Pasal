import {
  initializeKhaltiPayment,
  verifyKhaltiPayment,
} from "../config/khalti.js";
import Payment from "../model/payment-model.js";
import Item from "../model/item-model.js";
import PurchasedItem from "../model/purchased-item-model.js";
// import Product from "../model/product-model.js"
import { cartItem } from "../model/cart-model.js";

export const initializeKhalti = async (req, res) => {
  try {
    const { itemId, website_url } = req.body;

    console.log(req.body);

    const itemData = await cartItem
      .findOne({
        _id: itemId,
      })
      .populate("product");
    // console.log(itemData);
    if (!itemData) {
      return res.status(400).send({
        success: false,
        message: "item not found",
      });
    }

    const totalPrice = itemData.discountedPrice;
    //creating purchased document to store purchase info
    const purchasedItemData = await PurchasedItem.create({
      item: itemId,
      paymentMethod: "khalti",
      totalPrice: totalPrice,
    });

    const paymentInitiate = await initializeKhaltiPayment({
      amount: totalPrice * 100, // amount should be in paisa (Rs * 100)
      purchase_order_id: purchasedItemData._id, // purchase_order_id because we need to verify it later
      purchase_order_name: itemData.product.name,
      return_url: `${process.env.BACKEND_URI}/payment/complete-khalti-payment`, // it can be even managed from frontedn
      website_url,
    }); 
    res.status(200).json({
      success: true,
      purchasedItemData,
      payment: paymentInitiate,
    });
  } catch (error) {
    console.log("Error while initialize khalti ");
    res.status(500).json({
      success: false,
      message: "error occurs",
    });
  }
};

export const verifyPayment = async (req, res) => {
  const {
    pidx,
    txnId,
    amount,
    mobile,
    purchase_order_id,
    purchase_order_name,
    transaction_id,
  } = req.query;
  try {
    const paymentInfo = await verifyKhaltiPayment(pidx);
    // console.log(paymentInfo);

    //if payment is success then check the record if matched

    if (
      paymentInfo?.status !== "Completed" ||
      paymentInfo.transaction_id !== transaction_id ||
      Number(paymentInfo.total_amount) !== Number(amount)
    ) {
      return res.status(400).json({
        success: false,
        message: "Incomplete information",
        paymentInfo,
      });
    }
    //check if payment is done in valid cart(item)

    const purchasedItemData = await PurchasedItem.find({
      _id: purchase_order_id,
      totalPrice: amount,
    });
    if (!purchasedItemData) {
      return res.status(400).send({
        success: false,
        message: "Purchased data not found",
      });
    }
    // updating purchase record
    await PurchasedItem.findByIdAndUpdate(
      purchase_order_id,

      {
        $set: {
          status: "completed",
        },
      }
    );
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
    // Send success response
    res.json({
      success: true,
      message: "Payment Successful",
      paymentData,
    });
  } catch (error) {
    console.log("Error while verifying payment");
    res.status(500).json({
      message: "Error occurs",
      success: false,
    });
  }
};
