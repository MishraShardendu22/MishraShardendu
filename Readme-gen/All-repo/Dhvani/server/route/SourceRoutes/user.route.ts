import {   
  login,
  register,
  verifyUser,
  resetPassword,
  sendOtpUser,
  verifyOtpUser,
  getBloodRequests,
  postBloodRequest,
  getBloodAvailable,
  deleteBloodRequest,
  updateUser,
  getDonationHistory, 
  getDonationLocation,
  submitTBReport,
  submitStrokeReport,
  submitDiseaseDetection,
  getUserReports,
  getFile
} from '../../controller/user.controller';

import { Router } from 'express';
import { userMiddleware } from '../../middleware/user.middleware';
import multer from 'multer';

const router = Router();

// Configure multer for file uploads
const upload = multer({
  storage: multer.memoryStorage(),
  limits: {
    fileSize: 10 * 1024 * 1024, // 10MB limit
  },
  fileFilter: (req, file, cb) => {
    // Allow images and common document formats
    if (file.mimetype.startsWith('image/') || 
        file.mimetype === 'application/pdf' ||
        file.mimetype === 'text/plain') {
      cb(null, true);
    } else {
      cb(new Error('Invalid file type. Only images, PDFs, and text files are allowed.'));
    }
  }
});

// Routes Go Here

router.post('/login', login);
router.post('/register', register);
router.post('/sendOtpUser', sendOtpUser);
router.post('/resetPassUser', resetPassword);
router.post('/verifyOtpUser', verifyOtpUser);
router.post('/bloodRequest',userMiddleware, postBloodRequest);


// New report submission routes
router.post('/tb-report', userMiddleware, upload.array('files', 3), submitTBReport);
router.post('/stroke-report', userMiddleware, submitStrokeReport);
router.post('/disease-detection', userMiddleware, upload.array('files', 3), submitDiseaseDetection);

// Report retrieval routes
router.get('/reports', userMiddleware, getUserReports);
router.get('/file/:filename', getFile);

router.get('/verifyUser',userMiddleware, verifyUser);
router.get('/bloodRequests',userMiddleware, getBloodRequests);
router.get('/bloodAvailable',userMiddleware, getBloodAvailable);

router.delete('/bloodRequest/:requestId',userMiddleware, deleteBloodRequest);

router.put('/updateUser', userMiddleware, updateUser);

router.get('/donationHistory', userMiddleware, getDonationHistory);
router.get('/donationLocation', userMiddleware, getDonationLocation);
// Routes Go Here

export default router;
