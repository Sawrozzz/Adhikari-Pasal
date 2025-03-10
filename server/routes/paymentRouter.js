import express from 'express';
import { initializeKhalti, verifyPayment } from '../controllers/paymentController.js';

const router = express.Router();

router.post("/initialize-khalti",initializeKhalti);

router.get("/complete-khalti-payment", verifyPayment);


export default router;
