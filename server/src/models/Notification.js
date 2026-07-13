import mongoose from "mongoose";

const notificationSchema = new mongoose.Schema(
  {
    recipient: {
      clerkId: {
        type: String,
        required: true,
      },
      name: String,
    },

    report: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Report",
    },

    title: {
      type: String,
      required: true,
    },

    message: {
      type: String,
      required: true,
    },

    type: {
      type: String,
      enum: [
        "report",
        "verification",
        "assignment",
        "comment",
        "confirmation",
        "resolved",
        "system",
      ],
      default: "system",
    },

    isRead: {
      type: Boolean,
      default: false,
    },

    actionUrl: {
      type: String,
      default: "",
    },
  },
  {
    timestamps: true,
  }
);

export default mongoose.model(
  "Notification",
  notificationSchema
);