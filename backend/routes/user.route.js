import express from "express";
import {
  forgotpassword,
  getSingleUserProfile,
  Login,
  logout,
  resetPassword,
  signUp,
  verifyOtp,
} from "../controller/user.controller.js";
import { useMiddleware } from "../middleware/user.middleware.js";

const router = express.Router();
router.post("/signup", signUp);
router.post("/verify-otp", verifyOtp);
router.post("/login", Login);
router.post("/forgot-password", forgotpassword);
router.post("/reset-password", resetPassword);

router.get("/logout", logout);

router.get("/profile/:id", useMiddleware, getSingleUserProfile);

export default router;
