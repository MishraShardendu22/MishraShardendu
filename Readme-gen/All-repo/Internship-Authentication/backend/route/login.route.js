import express from "express";
const router = express.Router();
import {login} from "../controller/login.controller.js";

router.post("/login", login);

export default router;