import express from "express";
const router = express.Router();
import {logout} from "../controller/logout.controller.js";

router.post("/logout", logout);

export default router;