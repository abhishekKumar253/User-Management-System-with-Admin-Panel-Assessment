import mongoose from "mongoose";

const notificationSchema = new mongoose.Schema(
  {
    sender: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    recipient: {
      type: [mongoose.Schema.Types.ObjectId],
      ref: "User",
      required: true,
    },
    message: {
      type: String,
      required: true,
    },
    isCritical: {
      type: Boolean,
      default: false,
    },
    availabilityTime: {
      type: [String],
      required: true,
    },
    sentAt: {
      type: Date,
      default: Date.now,
    },
    deliveredAt: {
      type: Date,
    },
    delivered: {
      type: Boolean,
      default: false,
    },
  },
  { timestamps: true }
);

const Notification = mongoose.model("Notification", notificationSchema);

export default Notification;
