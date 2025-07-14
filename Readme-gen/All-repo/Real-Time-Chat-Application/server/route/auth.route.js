import { userLogin,userRegister,userLogout } from "../controller/auth.controller.js"
import express from 'express';

const router = express.Router();

// main routes go here : 

router.post("/register",userRegister)
router.post("/login",userLogin)
router.post("/logout",userLogout)

// till here 

export default router;