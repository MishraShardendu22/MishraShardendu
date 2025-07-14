import express from "express";
const router = express.Router();
import { verifyOtp,sendOtp } from "../controller/verify.controller.js";

router.post("/verify", verifyOtp);
router.post("/sendotp", sendOtp);

export default router;