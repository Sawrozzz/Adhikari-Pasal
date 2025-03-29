import express from 'express';

import {displayAllOrders} from "../controllers/orderController.js"

const router = express.Router();

router.get('/allOrders',displayAllOrders)

export  default router;