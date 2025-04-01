import express from 'express';
import { getAllNotifications } from '../controllers/notificationController.js';

const router = express.Router();

router.get("/all",getAllNotifications)

export default router;