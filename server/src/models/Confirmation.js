import mongoose from "mongoose";

const confirmationSchema = new mongoose.Schema(
  {
    report: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Report",
      required: true,
    },

    clerkId: {
      type: String,
      required: true,
    },

    confirmed: {
      type: Boolean,
      default: true,
    },
  },
  {
    timestamps: true,
  }
);

// Prevent duplicate confirmations by the same user
confirmationSchema.index(
  { report: 1, clerkId: 1 },
  { unique: true }
);

export default mongoose.model(
  "Confirmation",
  confirmationSchema
);