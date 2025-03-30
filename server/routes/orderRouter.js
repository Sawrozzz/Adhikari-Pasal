import express from 'express';
import { isAdmin } from '../middleware/isAdmin.js';
import {displayAllOrders, updateOrders, deleteOrders} from "../controllers/orderController.js"

const router = express.Router();

router.get('/allOrders',displayAllOrders)

router.patch("/updateOrder/:id",isAdmin, updateOrders);

router.delete("/deleteOrder/:id",isAdmin, deleteOrders)

export  default router;