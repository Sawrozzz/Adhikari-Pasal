import express from 'express';
import { isAdmin } from '../middleware/isAdmin.js';
import {
  displayAllOrders,
  updateOrders,
  deleteOrders,
  displayIndividualOrders,
} from "../controllers/orderController.js";

const router = express.Router();

router.get('/allOrders',displayAllOrders)

router.get("/:id", displayIndividualOrders);

router.patch("/updateOrder/:id",isAdmin, updateOrders);

router.delete("/deleteOrder/:id",isAdmin, deleteOrders)

export  default router;