import express from "express";
import upload from "../middleware/multer.js";
import { allProducts, create, searchProducts } from "../controllers/productController.js";

const router = express.Router();


router.post("/create",  upload.single("image"),create);
router.get("/all-products",allProducts);
router.get("/search", searchProducts);
export default router;