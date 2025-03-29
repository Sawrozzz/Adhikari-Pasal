import express from 'express';
import { initializeKhalti, verifyPayment } from '../controllers/paymentController.js';
import { isloggedIn } from '../middleware/isLoggedIn.js';
const router = express.Router();

router.post("/initialize-khalti",isloggedIn, initializeKhalti);

router.get("/complete-khalti-payment", verifyPayment);


export default router;
