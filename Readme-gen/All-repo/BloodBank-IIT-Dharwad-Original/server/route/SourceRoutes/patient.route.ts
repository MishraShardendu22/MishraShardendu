import {   
  login,
  register,
  verifyPatient,
  resetPassword,
  sendOtpPatient,
  verifyOtpPatient,
  getBloodRequests,
  postBloodRequest,
  getBloodAvailable,
  deleteBloodRequest,
  updateUser,
} from '../../controller/patient.controller';

import { Router } from 'express';
import { patientMiddleware } from '../../middleware/patient.middleware';
const router = Router();

// Routes Go Here

router.post('/login', login);
router.post('/register', register);
router.post('/sendOtpPatient', sendOtpPatient);
router.post('/resetPassPatient', resetPassword);
router.post('/verifyOtpPatient', verifyOtpPatient);
router.post('/bloodRequest',patientMiddleware, postBloodRequest);


router.get('/verifyPatient',patientMiddleware, verifyPatient);
router.get('/bloodRequests',patientMiddleware, getBloodRequests);
router.get('/bloodAvailable',patientMiddleware, getBloodAvailable);

router.delete('/bloodRequest/:requestId',patientMiddleware, deleteBloodRequest);

router.put('/updatePatient', patientMiddleware, updateUser);
// Routes Go Here

export default router;
