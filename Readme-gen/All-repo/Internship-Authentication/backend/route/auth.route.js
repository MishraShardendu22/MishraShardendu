import express from "express";
const router = express.Router();
import {validateToken} from "../controller/auth.controller.js";

router.post("/valid", validateToken);

export default router;