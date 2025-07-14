import express from 'express';
const router = express.Router();

import { getUser } from '../controller/user.controller.js'

router.get('/user/:id', getUser);

export default router;