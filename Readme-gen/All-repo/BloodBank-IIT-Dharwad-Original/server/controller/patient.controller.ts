import ResponseApi from '../util/ApiResponse.util';
import { Request, Response } from 'express';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { BloodRequest, Inventory, Patient } from '../model/model';
import { IPatient } from '../model/schema/patient.schema';
import { authenticator } from 'otplib';
import nodemailer from 'nodemailer';

const register = async (req: Request, res: Response) => {
  try {
    const { name, email, password, phoneNo } = req.body;

    if (!name || !email || !password || !phoneNo) {
      return ResponseApi(res, 400, 'Please provide all required fields');
    }

    if (password.length < 6 || password.length > 20) {
      return ResponseApi(res, 400, 'Password must be at least 6 and at most 20 characters');
    }

    if (phoneNo.length !== 10) {
      return ResponseApi(res, 400, 'Phone number must be 10 characters');
    }

    const existingPatient = await Patient.findOne({ email: email.toLowerCase() }) as IPatient | null;
    if (existingPatient) {
      return ResponseApi(res, 400, 'Patient already exists');
    }

    const genSalt = await bcrypt.genSalt(5);
    const hashedPassword = await bcrypt.hash(password, genSalt);

    const newPatient: IPatient = new Patient({
      name,
      email: email.toLowerCase(),
      password: hashedPassword,
      phoneNo,
    });
    await newPatient.save();

    return ResponseApi(res, 201, 'Patient registered successfully');
  } catch (error) {
    return ResponseApi(res, 500, error instanceof Error ? error.message : 'An unknown error occurred while registering the patient');
  }
};

const login = async (req: Request, res: Response) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return ResponseApi(res, 400, 'Please provide all required fields');
    }

    const existingPatient = await Patient.findOne({ email: email.toLowerCase() }) as IPatient | null;
    if (!existingPatient) {
      return ResponseApi(res, 400, 'Patient does not exist');
    }

    
    if (!process.env.JWT_SECRET_KEY) {
      return ResponseApi(res, 500, 'JWT secret key is not defined');
    }

    const token = jwt.sign(
      { _id: existingPatient._id, role: 'patient' },
      process.env.JWT_SECRET_KEY,
      { expiresIn: '30d' }
    );

    const isPasswordValid = await bcrypt.compare(password, existingPatient.password);
    if (!isPasswordValid) {
      return ResponseApi(res, 400, 'Invalid password');
    }

    return ResponseApi(res, 200, 'Patient logged in successfully', token);
  } catch (error) {
    return ResponseApi(res, 500, error instanceof Error ? error.message : 'An unknown error occurred while logging in the patient');
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

    const bloodRequests = await BloodRequest.find({ patientId: _id });
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
      patientId: _id,
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
      patientId: _id,
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

const verifyPatient = async (req: Request,res: Response) => {
  try{
    const { _id,role } = req.body;

    if(_id === undefined || role === undefined){
      return ResponseApi(res,403,'Forbidden');
    }

    const patient = await Patient.findById(_id);
    if(!patient){
      return ResponseApi(res,400,"No Such patient")
    }
    
    patient.password = "********"
    return ResponseApi(res,200,'Patient verified successfully',patient);
  }catch(error){
    return ResponseApi(
      res,
      500,
      error instanceof Error
        ? error.message
        : 'An unknown error occurred while verifying the patient'
    )
  }
}

let otpMap = new Map<string, { otp: string; timestamp: number }>();

const sendOtpPatient = async (req: Request, res: Response) => {
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

const verifyOtpPatient = async (req: Request, res: Response) => {
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

    const existingPatient = await Patient.findOne({ email });
    if(!existingPatient){
      return ResponseApi(res, 404, 'Patient not found');
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

    await Patient.findByIdAndUpdate(existingPatient._id, { password: hashedPassword });

    return ResponseApi(res, 200, 'Password reset successfully');
  }catch(error){
    console.log(error);
    return ResponseApi(res, 500, error instanceof Error ? error.message : 'An unknown error occurred while resetting the password');
  }
}

const updateUser = async (req: Request, res: Response) => {
  try{
    const { _id,name,email,phoneNo } = req.body;

    if(!_id || !name || !email || !phoneNo){
      return ResponseApi(res, 400, 'User ID is required');
    }

    if (phoneNo.length !== 10) {
      return ResponseApi(res, 400, 'Phone number must be 10 characters');
    }

    await Patient.findByIdAndUpdate(
      {_id : _id},
      {
        name,
        email: email.toLowerCase(),
        phoneNo
      }
    )

    return ResponseApi(res, 200, 'User updated successfully');
  }catch(error){
    return ResponseApi(res, 500, error instanceof Error ? error.message : 'An unknown error occurred while updating the user');
  }
}

export {
  login,
  register,
  updateUser,
  verifyPatient,
  resetPassword,
  sendOtpPatient,
  verifyOtpPatient,
  getBloodRequests,
  postBloodRequest,
  getBloodAvailable,
  deleteBloodRequest,
};