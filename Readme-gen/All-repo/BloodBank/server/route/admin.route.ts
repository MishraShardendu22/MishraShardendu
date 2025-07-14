import {
  getAllOrganistaion,
  getAllHospital,
  getAlldonor,
  deleteUser,
} from '../controller/admin.controller';
import { Router } from 'express';
import authMiddleware from '../middleware/auth.miiddleware';
import adminMiddleware from '../middleware/admin.middleware';

const router = Router();

router.get('/get-donor', authMiddleware, adminMiddleware, getAlldonor);
router.get('/get-hospital', authMiddleware, adminMiddleware, getAllHospital);
router.get('/get-org', authMiddleware, adminMiddleware, getAllOrganistaion);
router.delete('/delete-user', authMiddleware, adminMiddleware, deleteUser);

export default router;
