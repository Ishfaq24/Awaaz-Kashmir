import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {
    clerkId: {
      type: String,
      required: true,
      unique: true,
    },

    firstName: String,

    lastName: String,

    username: String,

    email: {
      type: String,
      unique: true,
    },

    image: String,

    role: {
      type: String,
      enum: ["citizen", "admin", "department"],
      default: "citizen",
    },

    trustScore: {
      type: Number,
      default: 50,
    },

    reportsCount: {
      type: Number,
      default: 0,
    },

    confirmations: {
      type: Number,
      default: 0,
    },
  },
  {
    timestamps: true,
  }
);

export default mongoose.model("User", userSchema);