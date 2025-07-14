import { bloodGroupDetailController } from '../controller/analytics.controller';
import authMiddleware from '../middleware/auth.miiddleware';
import { Router } from 'express';

const router = Router();

router.get('/blood-group-detail', authMiddleware, bloodGroupDetailController);

export default router;
