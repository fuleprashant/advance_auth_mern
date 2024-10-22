import express from "express";
import {
  forgotpassword,
  Login,
  logout,
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

router.get("/logout", logout);

export default router;
