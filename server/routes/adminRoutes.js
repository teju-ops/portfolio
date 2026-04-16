import { Router } from "express";
import {
  createAdminToken,
  requireAdminAuth,
  validateAdminCredentials,
} from "../middleware/adminAuth.js";

const router = Router();

router.post("/login", (req, res) => {
  const email = req.body?.email?.trim();
  const password = req.body?.password;

  if (!email || !password) {
    return res.status(400).json({
      success: false,
      message: "Email and password are required.",
    });
  }

  if (!validateAdminCredentials(email, password)) {
    return res.status(401).json({
      success: false,
      message: "Invalid admin credentials.",
    });
  }

  const token = createAdminToken(email);

  return res.status(200).json({
    success: true,
    message: "Admin login successful.",
    data: {
      token,
      email,
    },
  });
});

router.get("/session", requireAdminAuth, (req, res) => {
  return res.status(200).json({
    success: true,
    data: {
      email: req.admin.email,
      expiresAt: req.admin.expiresAt,
    },
  });
});

export default router;
