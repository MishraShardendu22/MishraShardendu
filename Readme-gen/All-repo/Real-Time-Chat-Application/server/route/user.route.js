import express from 'express';
import { isLogin } from "../middleware/isLogin.js"
import { getUserBySearch,getCurrentChats } from "../controller/user.controller.js"

const router = express.Router();

// main routes go here : 

router.get('/search',isLogin,getUserBySearch);
router.get('/currentChats',isLogin,getCurrentChats)

// till here 

export default router;