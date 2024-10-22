import express from "express";
import { Login, signUp, verifyOtp } from "../controller/user.controller.js";

const router = express.Router();
router.post("/signup", signUp);
router.post("/verify-otp", verifyOtp);
router.post("/login", Login);

export default router;
