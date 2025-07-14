import authMiddleware from '../middleware/auth.miiddleware';
import { Router } from 'express';
const router = Router();

import {
  register,
  login,
  currentUser,
  jwt_confirm,
} from '../controller/auth.controller';

router.post('/register', register);
router.post('/login', login);
router.get('/currentUser', authMiddleware, currentUser);
router.post('/verify', jwt_confirm);

export default router;
