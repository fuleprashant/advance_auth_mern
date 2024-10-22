import express from "express";
import {
  forgotpassword,
  Login,
  resetPassword,
  signUp,
  verifyOtp,
} from "../controller/user.controller.js";

const router = express.Router();
router.post("/signup", signUp);
router.post("/verify-otp", verifyOtp);
router.post("/login", Login);
router.post("/forgot-password", forgotpassword);
router.post("/reset-password", resetPassword);

export default router;
