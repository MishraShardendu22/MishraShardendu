import express from "express";
const router = express.Router();

import { reset,resetPassword } from '../controller/reset.controller.js'

router.post('/reset', reset);
router.patch('/resetPass', resetPassword);

export default router;