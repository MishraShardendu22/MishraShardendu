import ResponseApi from '../util/ApiResponse.util';
import { Request, Response } from 'express';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { BloodRequest, Inventory, Donation, DonationLocation, User, TBReport, StrokeReport, DiseaseDetection, File } from '../model/model';
import { IUser } from '../model/schema/user.schema';
import { authenticator } from 'otplib';
import nodemailer from 'nodemailer';
import multer from 'multer';
import { v4 as uuidv4 } from 'uuid';
import path from 'path';
import axios from 'axios';

// Helper function to send data to AI agents
const sendToAIAgents = async (data: any, aiUrl: string) => {
  try {
    if (!aiUrl) {
      console.error('AI agent URL not provided');
      return;
    }

    // If data contains files, we need to send as FormData
    if (data.files && data.files.length > 0) {
      const FormData = require('form-data');
      const formData = new FormData();
      
      // Add all non-file data as JSON string
      const dataWithoutFiles = { ...data };
      delete dataWithoutFiles.files;
      formData.append('data', JSON.stringify(dataWithoutFiles));
      
      // Add each file
      for (let i = 0; i < data.files.length; i++) {
        const file = data.files[i];
        formData.append(`file${i + 1}`, file.buffer, {
          filename: file.filename,
          contentType: file.contentType
        });
      }

      const response = await axios.post(aiUrl, formData, {
        headers: {
          ...formData.getHeaders(),
        },
        timeout: 60000, // 60 seconds timeout for file uploads
      });

      console.log(`Data with files sent to AI agents successfully: ${response.status}`);
      return response.data;
    } else {
      // Send as JSON for data without files
      const response = await axios.post(aiUrl, data, {
        headers: {
          'Content-Type': 'application/json',
        },
        timeout: 30000, // 30 seconds timeout
      });

      console.log(`Data sent to AI agents successfully: ${response.status}`);
      return response.data;
    }
  } catch (error) {
    console.error('Error sending data to AI agents:', error);
    // Don't throw error to avoid affecting the main flow
  }
};

const register = async (req: Request, res: Response) => {
  try {
    const { name, email, password, phoneNo, height, weight, bloodGroup, gender, dateOfBirth, address, aadharNo } = req.body;

    if (!name || !email || !password || !height || !weight || !bloodGroup || !gender || !dateOfBirth || !aadharNo) {
      return ResponseApi(res, 400, 'Please provide all required fields');
    }

    if (name.length < 3 || name.length > 100) {
      return ResponseApi(res, 400, 'Name must be between 3 and 50 characters');
    }

    
    if (email.length < 3 || email.length > 100) {
      return ResponseApi(res, 400, 'Email must be between 3 and 50 characters');
    }

    if (password.length < 6 || password.length > 20) {
      return ResponseApi(res, 400, 'Password must be at least 6 and at most 20 characters');
    }

    if (phoneNo && phoneNo.length !== 10) {
      return ResponseApi(res, 400, 'Phone number must be 10 characters');
    }

    if (aadharNo.length !== 12) {
      return ResponseApi(res, 400, 'Aadhar number must be 12 characters');
    }

    if (gender !== 'male' && gender !== 'female' && gender !== 'other') {
      return ResponseApi(res, 400, 'Invalid gender');
    }

    if (height < 40 || height > 300) {
      return ResponseApi(res, 400, 'Height must be between 40 and 300 cm');
    }

    if (weight < 1 || weight > 500) {
      return ResponseApi(res, 400, 'Weight must be between 1 and 500 kg');
    }

    if (dateOfBirth > new Date()) {
      return ResponseApi(res, 400, 'Date of birth cannot be in the future');
    }

    if (bloodGroup !== 'A+' && bloodGroup !== 'A-' && bloodGroup !== 'B+' && bloodGroup !== 'B-' && bloodGroup !== 'AB+' && bloodGroup !== 'AB-' && bloodGroup !== 'O+' && bloodGroup !== 'O-') {
      return ResponseApi(res, 400, 'Invalid blood group');
    }

    const existingUser = await User.findOne({ email: email.toLowerCase() }) as IUser | null;
    if (existingUser) {
      return ResponseApi(res, 400, 'User already exists');
    }

    const genSalt = await bcrypt.genSalt(5);
    const hashedPassword = await bcrypt.hash(password, genSalt);

    const newUser: IUser = new User({
      name,
      email: email.toLowerCase(),
      password: hashedPassword,
      phoneNo,
      height,
      weight,
      bloodGroup,
      gender,
      dateOfBirth,
      address,
      aadharNo
    });
    await newUser.save();

    return ResponseApi(res, 201, 'User registered successfully');
  } catch (error) {
    return ResponseApi(res, 500, error instanceof Error ? error.message : 'An unknown error occurred while registering the User');
  }
};

const login = async (req: Request, res: Response) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return ResponseApi(res, 400, 'Please provide all required fields');
    }

    const existingUser = await User.findOne({ email: email.toLowerCase() }) as IUser | null;
    if (!existingUser) {
      return ResponseApi(res, 400, 'User does not exist');
    }

    
    if (!process.env.JWT_SECRET_KEY) {
      return ResponseApi(res, 500, 'JWT secret key is not defined');
    }

    const token = jwt.sign(
      { _id: existingUser._id, role: 'user' },
      process.env.JWT_SECRET_KEY,
      { expiresIn: '30d' }
    );

    const isPasswordValid = await bcrypt.compare(password, existingUser.password);
    if (!isPasswordValid) {
      return ResponseApi(res, 400, 'Invalid password');
    }

    return ResponseApi(res, 200, 'User logged in successfully', token);
  } catch (error) {
    return ResponseApi(res, 500, error instanceof Error ? error.message : 'An unknown error occurred while logging in the User');
  }
};

const getBloodAvailable = async (req: Request, res: Response) => {
  try {
    const bloodAvailable = await Inventory.find().populate({
      path: 'OrganisationId',
      select: 'name email phoneNo'
    });
    return ResponseApi(res, 200, 'Blood available retrieved successfully', bloodAvailable);
  } catch (error) {
    return ResponseApi(res, 500, 'An unknown error occurred while getting the blood available');
  }
};

const getBloodRequests = async (req: Request, res: Response) => {
  try {
    const { _id } = req.body;

    if (!_id) {
      return ResponseApi(res, 400, 'User ID is required');
    }

    const bloodRequests = await BloodRequest.find({ userId: _id });
    return ResponseApi(res, 200, 'Blood requests retrieved successfully', bloodRequests);
  } catch (error) {
    return ResponseApi(res, 500, 'An unknown error occurred while getting the blood requests');
  }
};

const postBloodRequest = async (req: Request, res: Response) => {
  try{
    const { _id, bloodGroup, units } = req.body;

    if(!_id || !bloodGroup || !units){
      return ResponseApi(res, 400, 'Please provide all required fields');
    }

    const newBloodRequest = new BloodRequest({
      userId: _id,
      type: bloodGroup,
      quantity: units,
      completed: false
    });

    await newBloodRequest.save();
    return ResponseApi(res, 201, 'Blood request posted successfully');
  }catch(error){
    return ResponseApi(res, 500, 'An unknown error occurred while posting the blood request');
  }
}

const deleteBloodRequest = async (req: Request, res: Response) => {
  try {
    const { _id } = req.body;
    const requestId = req.params.requestId;

    if (!_id || !requestId) {
      return ResponseApi(res, 400, 'Please provide all required fields');
    }

    const bloodRequest = await BloodRequest.findOne({
      userId: _id,
      _id: requestId
    });

    if (!bloodRequest) {
      return ResponseApi(res, 404, 'Blood request not found');
    }

    await BloodRequest.findByIdAndDelete(requestId);
    return ResponseApi(res, 200, 'Blood request deleted successfully');
  } catch (error) {
    return ResponseApi(res, 500, 'An unknown error occurred while deleting the blood request');
  }
};

const verifyUser = async (req: Request,res: Response) => {
  try{
    const { _id,role } = req.body;

    if(_id === undefined || role === undefined){
      return ResponseApi(res,403,'Forbidden');
    }

    const user = await User.findById(_id);
    if(!user){
      return ResponseApi(res,400,"No Such User")
    }
    
    user.password = "********"
    return ResponseApi(res,200,'User verified successfully',user);
  }catch(error){
    return ResponseApi(
      res,
      500,
      error instanceof Error
        ? error.message
        : 'An unknown error occurred while verifying the user'
    )
  }
}

let otpMap = new Map<string, { otp: string; timestamp: number }>();

const sendOtpUser = async (req: Request, res: Response) => {
  try {
    const { email } = req.body;

    authenticator.options = { step: 600 };
    
    const secret = authenticator.generateSecret();
    const otp = authenticator.generate(secret);

    otpMap.set(email, { otp, timestamp: Date.now() });

    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: process.env.MAIL_ID,
        pass: process.env.MAIL_PASS,
      },
    });

    const mailOptions = {
      from: process.env.MAIL_ID,
      to: email,
      subject: '🩸 Your Blood Can Save Lives 🩸',
      html: `
        <h1>
          Your OTP is: <strong>${otp}</strong>
        </h1>
      `,
    };

    // Send the email with the OTP
    await transporter.sendMail(mailOptions);

    return ResponseApi(res, 200, 'OTP sent successfully');
  } catch (error) {
    return ResponseApi(res, 400, 'OTP not sent');
  }
};

const verifyOtpUser = async (req: Request, res: Response) => {
  try {
    const { email, otp } = req.body;
    if (!otpMap.has(email)) {
      return ResponseApi(res, 400, 'OTP not sent');
    }

    const storedOtp = otpMap.get(email);
    const isExpired = Date.now() - storedOtp!.timestamp > 10 * 60 * 1000;

    if (isExpired) {
      otpMap.delete(email);
      return ResponseApi(res, 400, 'OTP expired');
    }

    if (storedOtp!.otp !== otp) {
      return ResponseApi(res, 400, 'OTP not verified');
    }

    return ResponseApi(res, 200, 'OTP verified successfully');
  } catch (error) {
    return ResponseApi(res, 400, 'OTP Not verified');
  }
};

const resetPassword = async (req: Request, res: Response) => {
  try{
    const { email, password, otp } = req.body;

    if(!email || !password || !otp){
      return ResponseApi(res, 400, 'Please provide all required fields');
    }

    if(password.length < 6 || password.length > 20){
      return ResponseApi(res, 400, 'Password must be at least 6 and at most 20 characters');
    }

    const existingUser = await User.findOne({ email });
    if(!existingUser){
      return ResponseApi(res, 404, 'User not found');
    }

    if (!otpMap.has(email)) {
      return ResponseApi(res, 400, 'Error');
    }

    const storedOtp = otpMap.get(email);
    const isExpired = Date.now() - storedOtp!.timestamp > 10 * 60 * 1000;

    if (isExpired) {
      otpMap.delete(email);
      return ResponseApi(res, 400, 'Timed out');
    }

    if (storedOtp!.otp !== otp) {
      return ResponseApi(res, 400, 'Error');
    }

    const genSalt = await bcrypt.genSalt(5);
    const hashedPassword = await bcrypt.hash(password, genSalt);

    await User.findByIdAndUpdate(existingUser._id, { password: hashedPassword });

    return ResponseApi(res, 200, 'Password reset successfully');
  }catch(error){
    console.log(error);
    return ResponseApi(res, 500, error instanceof Error ? error.message : 'An unknown error occurred while resetting the password');
  }
}

const updateUser = async (req: Request, res: Response) => {
  try{
    const { _id,name,email,phoneNo,height,weight,bloodGroup,gender,dateOfBirth,address } = req.body;

    if(!_id || !name || !email || !height || !weight || !bloodGroup || !gender || !dateOfBirth){
      return ResponseApi(res, 400, 'User ID is required');
    }

    if (name.length < 3 || name.length > 100) {
      return ResponseApi(res, 400, 'Name must be between 3 and 50 characters');
    }

    if (email.length < 3 || email.length > 100) {
      return ResponseApi(res, 400, 'Email must be between 3 and 50 characters');
    }

    if (phoneNo && phoneNo.length !== 10) {
      return ResponseApi(res, 400, 'Phone number must be 10 characters');
    }

    if (gender !== 'male' && gender !== 'female' && gender !== 'other') {
      return ResponseApi(res, 400, 'Invalid gender');
    }

    if (height < 40 || height > 300) {
      return ResponseApi(res, 400, 'Height must be between 40 and 300 cm');
    }

    if (weight < 1 || weight > 500) {
      return ResponseApi(res, 400, 'Weight must be between 1 and 500 kg');
    }

    if (dateOfBirth > new Date()) {
      return ResponseApi(res, 400, 'Date of birth cannot be in the future');
    }

    if (bloodGroup !== 'A+' && bloodGroup !== 'A-' && bloodGroup !== 'B+' && bloodGroup !== 'B-' && bloodGroup !== 'AB+' && bloodGroup !== 'AB-' && bloodGroup !== 'O+' && bloodGroup !== 'O-') {
      return ResponseApi(res, 400, 'Invalid blood group');
    }

    await User.findByIdAndUpdate(
      {_id : _id},
      {
        name,
        email: email.toLowerCase(),
        phoneNo,
        height,
        weight,
        bloodGroup,
        gender,
        dateOfBirth,
        address
      }
    )

    return ResponseApi(res, 200, 'User updated successfully');
  }catch(error){
    return ResponseApi(res, 500, error instanceof Error ? error.message : 'An unknown error occurred while updating the user');
  }
}

const getDonationHistory = async (req: Request, res: Response) => {
  try {
    const { _id } = req.body;

    const donationHistory = await Donation.find({ userId: _id }).populate({
      path: 'organisationId',
      select: 'name'
    });

    return ResponseApi(res, 200, 'Donation history fetched successfully', donationHistory);
  } catch (error) {
    return ResponseApi(res, 500, error instanceof Error ? error.message : 'An unknown error occurred while fetching the donation history');
  }
};

const getDonationLocation = async (req: Request, res: Response) => {
  try {
    const donationLocation = await DonationLocation.find();
    return ResponseApi(res, 200, 'Donation location fetched successfully', donationLocation);
  } catch (error) {
    return ResponseApi(res, 500, error instanceof Error ? error.message : 'An unknown error occurred while getting the donation locations');
  }
};

// TB Report submission with file uploads
const submitTBReport = async (req: Request, res: Response) => {
  try {
    const { _id } = req.body;
    const files = req.files as Express.Multer.File[];

    if (!_id) {
      return ResponseApi(res, 400, 'User ID is required');
    }

    if (!files || files.length === 0) {
      return ResponseApi(res, 400, 'At least one file is required');
    }

    // Generate UUIDs for file names and save files
    const fileIds: string[] = [];
    const fileData: any[] = [];
    for (const file of files) {
      const fileId = uuidv4();
      const fileExtension = path.extname(file.originalname);
      const fileName = `${fileId}${fileExtension}`;

      // Save file to database
      const newFile = new File({
        filename: fileName,
        data: file.buffer,
        contentType: file.mimetype
      });
      await newFile.save();
      fileIds.push(fileName);
      
      // Store file data for AI agents
      fileData.push({
        filename: fileName,
        buffer: file.buffer,
        contentType: file.mimetype
      });
    }

    // Create TB report
    const newTBReport = new TBReport({
      userId: _id,
      file1: fileIds[0],
      file2: fileIds[1] || undefined,
      file3: fileIds[2] || undefined
    });

    await newTBReport.save();

    // Populate user data and send to AI agents
    const populatedReport = await TBReport.findById(newTBReport._id).populate({
      path: 'userId',
      select: 'height weight dateOfBirth gender'
    });

    if (populatedReport) {
      // Prepare data for AI agents
      const aiData = {
        reportId: populatedReport._id,
        userId: populatedReport.userId,
        files: fileData, // Include actual file data
        reportType: 'tb-report',
        userData: {
          height: (populatedReport.userId as any).height,
          weight: (populatedReport.userId as any).weight,
          dateOfBirth: (populatedReport.userId as any).dateOfBirth,
          gender: (populatedReport.userId as any).gender
        }
      };

      // Send to AI agents asynchronously (don't wait for response)
      sendToAIAgents(aiData, process.env.TB_AI_AGENT_URL || '');
    }

    return ResponseApi(res, 201, 'TB report submitted successfully', { reportId: newTBReport._id });
  } catch (error) {
    return ResponseApi(res, 500, error instanceof Error ? error.message : 'An unknown error occurred while submitting TB report');
  }
};

// Stroke Report submission with text data
const submitStrokeReport = async (req: Request, res: Response) => {
  try {
    const { _id, data } = req.body;

    if (!_id || !data) {
      return ResponseApi(res, 400, 'User ID and data are required');
    }

    // Create stroke report
    const newStrokeReport = new StrokeReport({
      userId: _id,
      data,
      result: 'Pending analysis' // Default result
    });

    await newStrokeReport.save();

    // Populate user data and send to AI agents
    const populatedReport = await StrokeReport.findById(newStrokeReport._id).populate({
      path: 'userId',
      select: 'height weight dateOfBirth gender'
    });

    if (populatedReport) {
      // Prepare data for AI agents
      const aiData = {
        reportId: populatedReport._id,
        userId: populatedReport.userId,
        data: populatedReport.data,
        reportType: 'stroke-report',
        userData: {
          height: (populatedReport.userId as any).height,
          weight: (populatedReport.userId as any).weight,
          dateOfBirth: (populatedReport.userId as any).dateOfBirth,
          gender: (populatedReport.userId as any).gender
        }
      };

      // Send to AI agents asynchronously (don't wait for response)
      sendToAIAgents(aiData, process.env.STROKE_AI_AGENT_URL || '');
    }

    return ResponseApi(res, 201, 'Stroke report submitted successfully', { reportId: newStrokeReport._id });
  } catch (error) {
    return ResponseApi(res, 500, error instanceof Error ? error.message : 'An unknown error occurred while submitting stroke report');
  }
};

// Disease Detection submission with files and text data
const submitDiseaseDetection = async (req: Request, res: Response) => {
  try {
    const { _id, currentSymptoms, previousDiseases } = req.body;
    const files = req.files as Express.Multer.File[];

    if (!_id || !currentSymptoms || !previousDiseases) {
      return ResponseApi(res, 400, 'User ID, current symptoms, and previous diseases are required');
    }

    if (!files || files.length === 0) {
      return ResponseApi(res, 400, 'At least one file is required');
    }

    // Generate UUIDs for file names and save files
    const fileIds: string[] = [];
    const fileData: any[] = [];
    for (const file of files) {
      const fileId = uuidv4();
      const fileExtension = path.extname(file.originalname);
      const fileName = `${fileId}${fileExtension}`;

      // Save file to database
      const newFile = new File({
        filename: fileName,
        data: file.buffer,
        contentType: file.mimetype
      });
      await newFile.save();
      fileIds.push(fileName);
      
      // Store file data for AI agents
      fileData.push({
        filename: fileName,
        buffer: file.buffer,
        contentType: file.mimetype
      });
    }

    // Create disease detection report
    const newDiseaseDetection = new DiseaseDetection({
      userId: _id,
      file1: fileIds[0],
      file2: fileIds[1] || undefined,
      file3: fileIds[2] || undefined,
      currentSymptoms,
      previousDiseases
    });

    await newDiseaseDetection.save();

    // Populate user data and send to AI agents
    const populatedReport = await DiseaseDetection.findById(newDiseaseDetection._id).populate({
      path: 'userId',
      select: 'height weight dateOfBirth gender'
    });

    if (populatedReport) {
      // Prepare data for AI agents
      const aiData = {
        reportId: populatedReport._id,
        userId: populatedReport.userId,
        files: fileData, // Include actual file data
        currentSymptoms: populatedReport.currentSymptoms,
        previousDiseases: populatedReport.previousDiseases,
        reportType: 'disease-detection',
        userData: {
          height: (populatedReport.userId as any).height,
          weight: (populatedReport.userId as any).weight,
          dateOfBirth: (populatedReport.userId as any).dateOfBirth,
          gender: (populatedReport.userId as any).gender
        }
      };

      // Send to AI agents asynchronously (don't wait for response)
      sendToAIAgents(aiData, process.env.DISEASE_AI_AGENT_URL || '');
    }

    return ResponseApi(res, 201, 'Disease detection report submitted successfully', { reportId: newDiseaseDetection._id });
  } catch (error) {
    return ResponseApi(res, 500, error instanceof Error ? error.message : 'An unknown error occurred while submitting disease detection report');
  }
};

// Get user's reports
const getUserReports = async (req: Request, res: Response) => {
  try {
    const { _id } = req.body;

    if (!_id) {
      return ResponseApi(res, 400, 'User ID is required');
    }

    const [tbReports, strokeReports, diseaseReports] = await Promise.all([
      TBReport.find({ userId: _id }),
      StrokeReport.find({ userId: _id }),
      DiseaseDetection.find({ userId: _id })
    ]);

    return ResponseApi(res, 200, 'User reports fetched successfully', {
      tbReports,
      strokeReports,
      diseaseReports
    });
  } catch (error) {
    return ResponseApi(res, 500, error instanceof Error ? error.message : 'An unknown error occurred while fetching user reports');
  }
};

// Get file by filename
const getFile = async (req: Request, res: Response) => {
  try {
    const { filename } = req.params;

    if (!filename) {
      return ResponseApi(res, 400, 'Filename is required');
    }

    const file = await File.findOne({ filename });

    if (!file) {
      return ResponseApi(res, 404, 'File not found');
    }

    res.set('Content-Type', file.contentType);
    res.set('Content-Disposition', `inline; filename="${filename}"`);
    res.send(file.data);
  } catch (error) {
    return ResponseApi(res, 500, error instanceof Error ? error.message : 'An unknown error occurred while fetching file');
  }
};

export {
  login,
  register,
  updateUser,
  verifyUser,
  resetPassword,
  sendOtpUser,
  verifyOtpUser,
  getBloodRequests,
  postBloodRequest,
  getBloodAvailable,
  deleteBloodRequest,
  getDonationHistory, 
  getDonationLocation,
  submitTBReport,
  submitStrokeReport,
  submitDiseaseDetection,
  getUserReports,
  getFile
};