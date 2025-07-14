import {
  deleteDonationLocation,
  getDonationLocations,
  deleteOrganisation,
  deleteBloodRequest,
  getBloodRequests,
  getOrganisation,
  verifyOtpAdmin,
  deletePatient,
  resetPassword,
  sendOtpAdmin,
  getAnalytics,
  verifyAdmin,
  deleteDonor,
  getPatients,
  updateUser,
  getDonors,
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

router.get('/getDonors',adminMiddleware ,getDonors);
router.get('/getPatients',adminMiddleware ,getPatients);
router.get('/verifyAdmin',adminMiddleware ,verifyAdmin);
router.get('/getAnalytics',adminMiddleware ,getAnalytics);
router.get('/getOrganisation',adminMiddleware ,getOrganisation);
router.get('/getBloodRequests',adminMiddleware ,getBloodRequests);
router.get('/getDonationLocations',adminMiddleware ,getDonationLocations);

router.delete('/deleteDonor',adminMiddleware ,deleteDonor);
router.delete('/deletePatient',adminMiddleware ,deletePatient);
router.delete('/deleteOrganisation',adminMiddleware ,deleteOrganisation);
router.delete('/deleteBloodRequest',adminMiddleware ,deleteBloodRequest);
router.delete('/deleteDonationLocation',adminMiddleware ,deleteDonationLocation);

router.put('/updateAdmin',adminMiddleware ,updateUser);

// Routes Go Here


export default router;
