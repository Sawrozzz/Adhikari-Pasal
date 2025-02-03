import express from "express";
import {uploadProductImage} from "../middleware/multer.js";
import { allProducts, create, searchProducts,removeProduct } from "../controllers/productController.js";

const router = express.Router();


router.post("/create", uploadProductImage.single("image"), create);
router.get("/all-products",allProducts);
router.get("/search", searchProducts);
router.delete("/delete/:id",removeProduct);

export default router;