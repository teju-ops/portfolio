import mongoose from "mongoose";

const contactSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
      minlength: 2,
      maxlength: 100,
    },
    email: {
      type: String,
      required: true,
      trim: true,
      lowercase: true,
      maxlength: 120,
    },
    message: {
      type: String,
      required: true,
      trim: true,
      minlength: 10,
      maxlength: 2000,
    },
    source: {
      type: String,
      default: "portfolio-site",
    },
    status: {
      type: String,
      enum: ["new", "reviewed", "replied"],
      default: "new",
    },
    userAgent: {
      type: String,
      default: "",
    },
    ipAddress: {
      type: String,
      default: "",
    },
    notificationStatus: {
      type: String,
      enum: ["pending", "sent", "skipped", "failed"],
      default: "pending",
    },
    repliedAt: {
      type: Date,
      default: null,
    },
    lastReplyMessage: {
      type: String,
      default: "",
    },
  },
  {
    timestamps: true,
  }
);

export default mongoose.models.Contact || mongoose.model("Contact", contactSchema);
