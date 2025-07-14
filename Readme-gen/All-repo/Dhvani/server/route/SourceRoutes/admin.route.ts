import {
  deleteDonationLocation,
  getDonationLocations,
  deleteOrganisation,
  deleteBloodRequest,
  getBloodRequests,
  getOrganisation,
  verifyOtpAdmin,
  resetPassword,
  sendOtpAdmin,
  getAnalytics,
  verifyAdmin,
  deleteUsers,
  updateUser,
  getUsers,
  register,
  login,
} from '../../controller/admin.controller';

import { Router } from 'express';
import { adminMiddleware } from '../../middleware/admin.middleware';
const router = Router();

// Routes Go Here

router.post('/login', login);
router.post('/register', register);
router.post('/sendOtpAdmin',sendOtpAdmin);
router.post('/resetPassAdmin',resetPassword);
router.post('/verifyOtpAdmin',verifyOtpAdmin);

router.get('/getUsers',adminMiddleware ,getUsers);
router.get('/verifyAdmin',adminMiddleware ,verifyAdmin);
router.get('/getAnalytics',adminMiddleware ,getAnalytics);
router.get('/getOrganisation',adminMiddleware ,getOrganisation);
router.get('/getBloodRequests',adminMiddleware ,getBloodRequests);
router.get('/getDonationLocations',adminMiddleware ,getDonationLocations);

router.delete('/deleteUsers',adminMiddleware ,deleteUsers);
router.delete('/deleteOrganisation',adminMiddleware ,deleteOrganisation);
router.delete('/deleteBloodRequest',adminMiddleware ,deleteBloodRequest);
router.delete('/deleteDonationLocation',adminMiddleware ,deleteDonationLocation);

router.put('/updateAdmin',adminMiddleware ,updateUser);

// Routes Go Here


export default router;
