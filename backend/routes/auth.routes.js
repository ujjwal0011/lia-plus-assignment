import express from "express";
import {
  register,
  verifyEmail,
  resendVerificationOTP,
  login,
  logout,
  getCurrentUser,
  updatePassword,
  forgotPassword,
  resetPassword,
} from "../controllers/auth/index.js";
import { isAuthenticated } from "../middlewares/auth.js";

const router = express.Router();

router.post("/register", register);
router.post("/verify-email", verifyEmail);
router.post("/login", login);
router.get("/logout", logout);

router.post("/forgot-password", forgotPassword);
router.post("/reset-password", resetPassword);

router.post("/resend-verification", resendVerificationOTP);

router.get("/profile", isAuthenticated, getCurrentUser);

router.put("/update-password", isAuthenticated, updatePassword);

export default router;
