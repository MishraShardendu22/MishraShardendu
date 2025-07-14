import { getMessage, sendMessage } from '../controller/message.controller.js';
import { isLogin } from "../middleware/isLogin.js"
import express from 'express';

const router = express.Router();

// main routes go here : 

router.post("/send/:id",isLogin,sendMessage)
router.get("/:id",isLogin,getMessage)

// till here 

export default router;