import { Router } from "express";
import Contact from "../models/Contact.js";
import { requireAdminAuth } from "../middleware/adminAuth.js";
import { sendNewContactNotification, sendReplyEmail } from "../services/emailService.js";

const router = Router();

function isValidEmail(email) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

router.post("/", async (req, res, next) => {
  try {
    const name = req.body?.name?.trim();
    const email = req.body?.email?.trim().toLowerCase();
    const message = req.body?.message?.trim();

    if (!name || !email || !message) {
      return res.status(400).json({
        success: false,
        message: "Name, email, and message are required.",
      });
    }

    if (!isValidEmail(email)) {
      return res.status(400).json({
        success: false,
        message: "Please provide a valid email address.",
      });
    }

    const contact = await Contact.create({
      name,
      email,
      message,
      userAgent: req.get("user-agent") || "",
      ipAddress: req.ip || "",
    });

    try {
      const notificationResult = await sendNewContactNotification(contact);
      contact.notificationStatus = notificationResult.sent ? "sent" : "skipped";
    } catch (error) {
      contact.notificationStatus = "failed";
    }

    await contact.save();

    return res.status(201).json({
      success: true,
      message: "Contact saved successfully.",
      data: {
        id: contact._id,
        notificationStatus: contact.notificationStatus,
      },
    });
  } catch (error) {
    return next(error);
  }
});

router.get("/", requireAdminAuth, async (req, res, next) => {
  try {
    const contacts = await Contact.find()
      .sort({ createdAt: -1 })
      .select("name email message status notificationStatus lastReplyMessage repliedAt createdAt updatedAt");

    return res.status(200).json({
      success: true,
      count: contacts.length,
      data: contacts,
    });
  } catch (error) {
    return next(error);
  }
});

router.patch("/:id/status", requireAdminAuth, async (req, res, next) => {
  try {
    const { status } = req.body;

    if (!["new", "reviewed", "replied"].includes(status)) {
      return res.status(400).json({
        success: false,
        message: "Invalid contact status.",
      });
    }

    const contact = await Contact.findByIdAndUpdate(
      req.params.id,
      { status },
      { new: true, runValidators: true }
    ).select("name email message status notificationStatus lastReplyMessage repliedAt createdAt updatedAt");

    if (!contact) {
      return res.status(404).json({
        success: false,
        message: "Contact not found.",
      });
    }

    return res.status(200).json({
      success: true,
      message: "Contact status updated successfully.",
      data: contact,
    });
  } catch (error) {
    return next(error);
  }
});

router.post("/:id/reply", requireAdminAuth, async (req, res, next) => {
  try {
    const replyMessage = req.body?.message?.trim();

    if (!replyMessage) {
      return res.status(400).json({
        success: false,
        message: "Reply message is required.",
      });
    }

    const contact = await Contact.findById(req.params.id);

    if (!contact) {
      return res.status(404).json({
        success: false,
        message: "Contact not found.",
      });
    }

    await sendReplyEmail(contact, replyMessage);

    contact.status = "replied";
    contact.repliedAt = new Date();
    contact.lastReplyMessage = replyMessage;
    await contact.save();

    return res.status(200).json({
      success: true,
      message: "Reply email sent successfully.",
      data: contact,
    });
  } catch (error) {
    return next(error);
  }
});

router.delete("/:id", requireAdminAuth, async (req, res, next) => {
  try {
    const deletedContact = await Contact.findByIdAndDelete(req.params.id);

    if (!deletedContact) {
      return res.status(404).json({
        success: false,
        message: "Contact not found.",
      });
    }

    return res.status(200).json({
      success: true,
      message: "Contact deleted successfully.",
    });
  } catch (error) {
    return next(error);
  }
});

export default router;
