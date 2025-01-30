import express from "express";
const router = express.Router();
import {
  addToCart,
  displayCart,
  deleteCart,
  updateCart,
} from "../controllers/cartController.js";
import { isloggedIn } from "../middleware/isLoggedIn.js";

router.post("/add-to-cart/:id", addToCart);

router.get("/my-carts", displayCart);

router.delete("/delete-cart/:id", deleteCart); 

router.patch("/update-cart/:id", updateCart);

export default router;
