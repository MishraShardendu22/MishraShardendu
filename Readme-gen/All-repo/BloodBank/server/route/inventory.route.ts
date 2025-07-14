import express from 'express';
import {
  getDonor,
  getHospital,
  getInventory,
  createInventory,
  getOrganization,
  getRecentInventory,
  getInventoryByHospital,
  getOrganizationForHospitalController,
} from '../controller/inventory.controller';

import authMiddleware from '../middleware/auth.miiddleware';

const router = express.Router();

router.get('/get-donor', authMiddleware, getDonor);
router.get('/get-hospital', authMiddleware, getHospital);
router.get('/get-inventory', authMiddleware, getInventory);
router.get('/get-organisation', authMiddleware, getOrganization);
router.post('/create-inventory', authMiddleware, createInventory);
router.get('/get-recent-inventory', authMiddleware, getRecentInventory);
router.post('/get-inventory-hospital', authMiddleware, getInventoryByHospital);
router.get(
  '/get-organizations-for-hospital',
  authMiddleware,
  getOrganizationForHospitalController
);

export default router;
