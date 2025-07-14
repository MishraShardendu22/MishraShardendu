import { 
  login,
  register,
  getAnalytics,
  getInventory,
  resetPassword,
  updateInventory,
  addBloodDonated,
  getBloodRequests,
  verifyOrganisation,
  sendOtpOrganisation,
  addDonationLocation,
  completeBloodRequest,
  getDonationLocations,
  verifyOtpOrganisation,
  updateDonationLocation,
  deleteDonationLocation,
} from '../../controller/organisation.controller';
import { Router } from 'express';
import { organisationMiddleware } from '../../middleware/organisation.middleware';
const router = Router();

// Routes Go Here


router.get('/getAnalytics', organisationMiddleware, getAnalytics)
router.get('/getInventory', organisationMiddleware, getInventory)
router.get('/getBloodRequests', organisationMiddleware, getBloodRequests);
router.get('/verifyOrganisation', organisationMiddleware, verifyOrganisation);
router.get('/getDonationLocations', organisationMiddleware, getDonationLocations)

router.post('/login', login);
router.post('/register', register);
router.post('/resetPassOrganisation', resetPassword);
router.post('/sendOtpOrganisation', sendOtpOrganisation);
router.post('/verifyOtpOrganisation', verifyOtpOrganisation);
router.post('/addBloodDonated', organisationMiddleware, addBloodDonated);
router.post('/addDonationLocation', organisationMiddleware, addDonationLocation);

router.patch('/updateInventory', organisationMiddleware, updateInventory);
router.patch('/completeBloodRequest', organisationMiddleware, completeBloodRequest);
router.patch('/updateDonationLocation', organisationMiddleware, updateDonationLocation);

router.delete('/deleteDonationLocation', organisationMiddleware, deleteDonationLocation);

router.put('/updateorganisation', organisationMiddleware, updateInventory);

// Routes Go Here

export default router;
