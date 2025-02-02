import express from "express";
import { adminRoute, protectRoute } from "../middleware/protectRoute.js";
import {
  getAllSentNotifications,
  getNotifications,
  markAsDelivered,
  sendNotification,
} from "../controllers/notification.controller.js";

const router = express.Router();

router.get("/get", protectRoute, getNotifications);
router.get("/sent", protectRoute, getAllSentNotifications);
router.post("/send", protectRoute, sendNotification);
router.put("/mark-delivered/:notificationId", protectRoute, markAsDelivered);

export default router;
