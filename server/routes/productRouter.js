import express from "express";
import upload from "../middleware/multer.js";
import { create } from "../controllers/productController.js";

const router = express.Router();


router.post("/create",  upload.single("image"),create);
export default router;