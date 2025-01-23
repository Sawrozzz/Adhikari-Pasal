import express from "express";
const router = express.Router();
import { addToCart } from "../controllers/cartController.js";
import { isloggedIn } from "../middleware/isLoggedIn.js";

router.post("/add-to-cart/:id",addToCart);

export default router;