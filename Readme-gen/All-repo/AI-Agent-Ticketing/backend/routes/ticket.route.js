import express from 'express';
import { authMiddleware } from '../middleware/auth.middleware.js';
import { createTicket, getTicket, getTickets } from '../controller/ticket.controller.js';
const router = express.Router();
router.get("/test", async (req, res) => {
    return res.status(200).json({ message: "Ticket route is working" });
});
router.get("/", authMiddleware, getTickets);
router.get("/:id", authMiddleware, getTicket);
router.post("/", authMiddleware, createTicket);
export default router;
