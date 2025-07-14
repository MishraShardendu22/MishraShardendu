import express from "express";
import { authMiddleware } from "../middleware/auth.middleware.js";
import { getUser, login, logout, signup, updateUser } from "../controller/user.conttroller.js";
const router = express.Router();

router.get("/test", async (req, res) => {
  return res.status(200).json({ message: "User route is working" });
});
router.post("/login", login);
router.post("/logout", logout);
router.post("/signup", signup);
router.get("/users", authMiddleware, getUser);
router.post("/update", authMiddleware, updateUser);
export default router;
