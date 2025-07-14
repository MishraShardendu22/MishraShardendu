import { Donation, DonationLocation, Donor } from '../model/model';
import { IDonor } from '../model/schema/donor.schema';
import ResponseApi from '../util/ApiResponse.util';
import { Request, Response } from 'express';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs';
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

    const existingDonor = (await Donor.findOne({ email: email.toLowerCase() })) as IDonor | null;
    if (existingDonor) {
      return ResponseApi(res, 400, 'Donor already exists');
    }

    const genSalt = await bcrypt.genSalt(5);
    const hashedPassword = await bcrypt.hash(password, genSalt);

    const newDonor: IDonor = new Donor({
      name,
      email: email.toLowerCase(),
      password: hashedPassword,
      phoneNo,
    });
    await newDonor.save();

    return ResponseApi(res, 201, 'Donor registered successfully');
  } catch (error) {
    return ResponseApi(res, 500, handleError(error));
  }
};

const login = async (req: Request, res: Response) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return ResponseApi(res, 400, 'Please provide all required fields');
    }

    const existingDonor = (await Donor.findOne({ email: email.toLowerCase() })) as IDonor | null;
    if (!existingDonor) {
      return ResponseApi(res, 400, 'Donor does not exist');
    }

    const isPasswordValid = await bcrypt.compare(password, existingDonor.password);
    if (!isPasswordValid) {
      return ResponseApi(res, 400, 'Invalid password');
    }

    if (!process.env.JWT_SECRET_KEY) {
      return ResponseApi(res, 500, 'JWT secret key is not defined');
    }

    const token = jwt.sign(
      { _id: existingDonor._id, role: 'donor' },
      process.env.JWT_SECRET_KEY,
      { expiresIn: '30d' }
    );

    return ResponseApi(res, 200, 'Donor logged in successfully', token);
  } catch (error) {
    return ResponseApi(res, 500, handleError(error));
  }
};

const getDonationHistory = async (req: Request, res: Response) => {
  try {
    const { _id } = req.body;

    const donationHistory = await Donation.find({ donorId: _id }).populate({
      path: 'organisationId',
      select: 'name'
    });

    return ResponseApi(res, 200, 'Donation history fetched successfully', donationHistory);
  } catch (error) {
    return ResponseApi(res, 500, handleError(error));
  }
};

const getDonationLocation = async (req: Request, res: Response) => {
  try {
    const donationLocation = await DonationLocation.find();
    return ResponseApi(res, 200, 'Donation location fetched successfully', donationLocation);
  } catch (error) {
    return ResponseApi(res, 500, handleError(error));
  }
};

const handleError = (error: unknown) => {
  return error instanceof Error ? error.message : 'An unknown error occurred';
};

const verifyDonor = async (req: Request,res: Response) => {
  try{
    const { _id,role } = req.body;

    if(_id === undefined || role === undefined){
      return ResponseApi(res,403,'Forbidden');
    }

    const donor = await Donor.findById(_id);
    if(!donor){
      return ResponseApi(res,400,"No Such Donor")
    }
    
    donor.password = "********"

    return ResponseApi(res,200,'Donor verified successfully',donor);
  }catch(error){
    return ResponseApi(
      res,
      500,
      error instanceof Error
        ? error.message
        : 'An unknown error occurred while verifying the donor'
    )
  }
}

let otpMap = new Map<string, { otp: string; timestamp: number }>();

const sendOtpDonor = async (req: Request, res: Response) => {
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
      html: `<h1>Your OTP is: <strong>${otp}</strong></h1>`,
    };

    await transporter.sendMail(mailOptions);

    return ResponseApi(res, 200, 'OTP sent successfully');
  } catch (error) {
    return ResponseApi(res, 500, error instanceof Error ? error.message : 'An unknown error occurred while sending the OTP');
  }
};

const verifyOtpDonor = async (req: Request, res: Response) => {
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

    const existingDonor = await Donor.findOne({ email });
    if(!existingDonor){
      return ResponseApi(res, 404, 'Donor not found');
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

    await Donor.findByIdAndUpdate(existingDonor._id, { password: hashedPassword });

    return ResponseApi(res, 200, 'Password reset successfully');
  }catch(error){
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

    await Donor.findByIdAndUpdate(
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
  verifyDonor, 
  sendOtpDonor,
  resetPassword, 
  verifyOtpDonor,
  getDonationHistory, 
  getDonationLocation, 
};
