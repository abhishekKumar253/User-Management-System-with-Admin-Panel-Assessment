import mongoose from "mongoose";
import Notification from "../models/notification.model.js";
import User from "../models/user.model.js";

export const sendNotification = async (req, res) => {
  const { recipient, message, isCritical, availabilityTime } = req.body;
  const sender = req.user._id;

  try {
    if (!recipient || !message || !availabilityTime) {
      return res.status(400).json({ error: "All fields are required" });
    }

    const recipientIds = recipient.map((id) => new mongoose.Types.ObjectId(id));

    const recipients = await User.find({ _id: { $in: recipientIds } });
    if (recipients.length !== recipient.length) {
      return res.status(400).json({ error: "Some users do not exist" });
    }

    const notification = new Notification({
      sender,
      recipient,
      message,
      isCritical,
      availabilityTime,
      sentAt: Date.now(),
    });

    await notification.save();

    if (isCritical) {
      notification.delivered = true;
      notification.deliveredAt = Date.now();
      await notification.save();
    }

    res.status(201).json({
      message: `Notification ${
        isCritical ? "sent and marked as critical" : "sent successfully"
      }`,
      notification: {
        sender: notification.sender,
        recipient: notification.recipient,
        message: notification.message,
        isCritical: notification.isCritical,
        availabilityTime: notification.availabilityTime,
        sentAt: notification.sentAt,
      },
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Error sending notification", error });
  }
};


export const getNotifications = async (req, res) => {
  try {
    const notifications = await Notification.find({
      recipient: req.user._id,
    }).sort({ sentAt: -1 });

    res.status(200).json({ notifications });
  } catch (error) {
    res.status(500).json({ error: "Error fetching notifications", error });
  }
};

export const markAsDelivered = async (req, res) => {
  const { notificationId } = req.params;

  try {
    const notification = await Notification.findById(notificationId);

    if (!notification) {
      return res.status(404).json({ error: "Notification not found" });
    }
    if (
      notification.recipient.toString() !== req.user._id.toString() &&
      req.user.role !== "admin"
    ) {
      return res
        .status(403)
        .json({ error: "You are not authorized to mark this notification" });
    }

    notification.delivered = true;
    notification.deliveredAt = Date.now();
    await notification.save();

    res
      .status(200)
      .json({ message: "Notification marked as delivered", notification });
  } catch (error) {
    res.status(500).json({
      error: "Error marking notification as delivered",
      details: error.message,
    });
  }
};

export const getAllSentNotifications = async (req, res) => {
  try {
    const notifications = await Notification.find({
      sender: req.user._id,
    }).sort({ sentAt: -1 });

    res.status(200).json({ notifications });
  } catch (error) {
    res.status(500).json({
      error: "Error fetching sent notifications",
      details: error.message,
    });
  }
};
