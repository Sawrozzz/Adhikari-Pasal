import express from "express";
const router = express.Router();
import { addToCart, displayCart, deleteCart } from "../controllers/cartController.js";
import { isloggedIn } from "../middleware/isLoggedIn.js";

router.post("/add-to-cart/:id",addToCart);

router.get("/my-carts",displayCart)

router.delete("/delete-cart",deleteCart)

export default router;