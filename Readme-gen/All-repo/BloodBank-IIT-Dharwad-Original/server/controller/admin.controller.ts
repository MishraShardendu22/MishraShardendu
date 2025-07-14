import { Admin, BloodRequest, Donation, DonationLocation, Donor, Inventory, Organisation, Patient } from '../model/model';
import { IDonationLocation } from '../model/schema/donation-location.schema';
import { IBloodRequest } from '../model/schema/blood-request.schema';
import { IPatient } from '../model/schema/patient.schema';
import { IDonor } from '../model/schema/donor.schema';
import { IAdmin } from '../model/schema/admin.schema';
import ResponseApi from '../util/ApiResponse.util';
import { Request, Response } from 'express';
import { authenticator } from 'otplib';
import nodemailer from 'nodemailer';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs';

const register = async (req: Request, res: Response) => {
  try {
    const { name, email, password, phoneNo, adminPassword } = req.body;

    if(process.env.ADMIN_PASSWORD !== adminPassword){
      return ResponseApi(res, 400, 'Invalid Admin Password');
    }

    if (!name || !email || !password || !phoneNo || !adminPassword) {
      return ResponseApi(res, 400, 'Please provide all required fields');
    }

    if (password.length < 6 || password.length > 20) {
      return ResponseApi(
        res,
        400,
        'Password must be at least 6 and at most 20 characters'
      );
    }

    if (phoneNo.length !== 10) {
      return ResponseApi(res, 400, 'Phone number must be 10 characters');
    }

    const existingAdmin = (await Admin.findOne({
      email: email.toLowerCase(),
    })) as IAdmin | null;
    if (existingAdmin) {
      return ResponseApi(res, 400, 'Admin already exists');
    }

    const genSalt = await bcrypt.genSalt(5);
    const hashedPassword = await bcrypt.hash(password, genSalt);

    const newAdmin: IAdmin = new Admin({
      name,
      email: email.toLowerCase(),
      password: hashedPassword,
      phoneNo,
    });
    await newAdmin.save();

    return ResponseApi(res, 201, 'Admin registered successfully');
  } catch (error) {
    return ResponseApi(
      res,
      500,
      error instanceof Error
        ? error.message
        : 'An unknown error occurred while registering the admin'
    );
  }
};

const login = async (req: Request, res: Response) => {
  try {
    const { email, password, adminPassword  } = req.body;

    if(!adminPassword){
      return ResponseApi(res, 400, 'Admin Password is required');
    }

    if(process.env.ADMIN_PASSWORD !== adminPassword){
      return ResponseApi(res, 400, 'Invalid Admin Password');
    }

    if (!email || !password) {
      return ResponseApi(res, 400, 'Please provide all required fields');
    }

    const existingAdmin = (await Admin.findOne({
      email: email.toLowerCase(),
    })) as IAdmin | null;
    if (!existingAdmin) {
      return ResponseApi(res, 400, 'Admin does not exist');
    }

    const isPasswordValid = await bcrypt.compare(
      password,
      existingAdmin.password
    );
    if (!isPasswordValid) {
      return ResponseApi(res, 400, 'Invalid password');
    }

    if (!process.env.JWT_SECRET_KEY) {
      return ResponseApi(res, 500, 'JWT secret key is not defined');
    }

    const token = jwt.sign(
      {
        _id: existingAdmin._id,
        role: 'admin',
      },
      process.env.JWT_SECRET_KEY,
      { expiresIn: '30d' }
    );

    return ResponseApi(res, 200, 'Admin logged in successfully', token);
  } catch (error) {
    return ResponseApi(
      res,
      500,
      error instanceof Error
        ? error.message
        : 'An unknown error occurred while logging in the admin'
    );
  }
};

const getDonationLocations = async (req: Request, res: Response) => {
  try{
    const donationLocations = await DonationLocation.find({}).populate("organisationId", "name email phoneNo") as IDonationLocation[];
    return ResponseApi(res, 200, 'Donation locations retrieved successfully', donationLocations);
  }catch(error){
    return ResponseApi(res, 500, error instanceof Error ? error.message : 'An unknown error occurred while getting the donation locations');
  }
}

const deleteDonationLocation = async (req: Request, res: Response) => {
  try{
    const { donationLocationId } = req.body;

    if(!donationLocationId){
      return ResponseApi(res, 400, 'Donation location ID is required');
    }

    const donationLocation = await DonationLocation.findByIdAndDelete(donationLocationId) as IDonationLocation | null;
    if(!donationLocation){
      return ResponseApi(res, 404, 'Donation location not found');
    }

    return ResponseApi(res, 200, 'Donation location deleted successfully');
  }catch(error){
    return ResponseApi(res, 500, error instanceof Error ? error.message : 'An unknown error occurred while deleting the donation location');
  }
}

const getBloodRequests = async (req: Request, res: Response) => {
  try{
    const bloodRequests = await BloodRequest.find({}).populate("patientId", "name email phoneNo") as IBloodRequest[];
    return ResponseApi(res, 200, 'Blood requests retrieved successfully', bloodRequests);
  }catch(error){
    return ResponseApi(res, 500, error instanceof Error ? error.message : 'An unknown error occurred while getting the blood requests');
  }
}

const deleteBloodRequest = async (req: Request, res: Response) => {
  try{
    const { bloodRequestId } = req.body;

    if(!bloodRequestId){
      return ResponseApi(res, 400, 'Blood request ID is required');
    }

    const bloodRequest = await BloodRequest.findByIdAndDelete(bloodRequestId) as IBloodRequest | null;
    if(!bloodRequest){
      return ResponseApi(res, 404, 'Blood request not found');
    }

    return ResponseApi(res, 200, 'Blood request deleted successfully');
  }catch(error){
    return ResponseApi(res, 500, error instanceof Error ? error.message : 'An unknown error occurred while deleting the blood request');
  }
}

const getDonors = async (req: Request, res: Response) => {
  try{
    const donor = await Donor.find({}) as IDonor[];
    return ResponseApi(res, 200, 'Donors retrieved successfully', donor.map((donor) => {
      donor.password = "******"
      return donor
    }));
  }catch(error){
    return ResponseApi(res, 500, error instanceof Error ? error.message : 'An unknown error occurred while getting the donors');
  }
}

const deleteDonor = async (req: Request, res: Response) => {
  try{
    const { donorId } = req.body;

    if(!donorId){
      return ResponseApi(res, 400, 'Donor ID is required');
    }

    const donor = await Donor.findByIdAndDelete(donorId);
    if(!donor){
      return ResponseApi(res, 404, 'Donor not found');
    }

    return ResponseApi(res, 200, 'Donor deleted successfully');
  }catch(error){
    return ResponseApi(res, 500, error instanceof Error ? error.message : 'An unknown error occurred while deleting the donor');
  }
}

const getPatients = async (req: Request, res: Response) => {
  try{
    const patients = await Patient.find({}) as IPatient[];
    return ResponseApi(res, 200, 'Patients retrieved successfully', patients.map((patient) => {
      patient.password = "******"
      return patient
    }));
  }catch(error){
    return ResponseApi(res, 500, error instanceof Error ? error.message : 'An unknown error occurred while getting the patients');
  }
}

const deletePatient = async (req: Request, res: Response) => {
  try{
    const { patientId } = req.body;

    if(!patientId){
      return ResponseApi(res, 400, 'Patient ID is required');
    }

    await BloodRequest.deleteMany({
      patientId
    })

    const patient = await Patient.findByIdAndDelete(patientId);
    if(!patient){
      return ResponseApi(res, 404, 'Patient not found');
    }

    return ResponseApi(res, 200, 'Patient deleted successfully');
  }catch(error){
    return ResponseApi(res, 500, error instanceof Error ? error.message : 'An unknown error occurred while deleting the patient');
  }
}

const getOrganisation = async (req: Request, res: Response) => {
  try{
    const organisations = await Organisation.find({});
    return ResponseApi(res, 200, 'Organisations retrieved successfully', organisations.map((organisation) => {
      organisation.password = "******"
      return organisation
    }));
  }catch(error){
    return ResponseApi(res, 500, error instanceof Error ? error.message : 'An unknown error occurred while getting the organisations');
  }
}

const deleteOrganisation = async (req: Request, res: Response) => {
  try{
    const { organisationId } = req.body;

    if(!organisationId){
      return ResponseApi(res, 400, 'Organisation ID is required');
    }

    await DonationLocation.deleteMany({
      organisationId
    })

    await Inventory.deleteOne({
      OrganisationId: organisationId
    })

    const organisation = await Organisation.findByIdAndDelete(organisationId);
    if(!organisation){
      return ResponseApi(res, 404, 'Organisation not found');
    }

    return ResponseApi(res, 200, 'Organisation deleted successfully');
  }catch(error){
    return ResponseApi(res, 500, error instanceof Error ? error.message : 'An unknown error occurred while deleting the organisation');
  }
}

const getAnalytics = async (req: Request, res: Response) => {
  try{
    const donors = await Donor.countDocuments();
    const patients = await Patient.countDocuments();
    const organisations = await Organisation.countDocuments();
    const donationLocations = await DonationLocation.countDocuments();
    const bloodRequests = await BloodRequest.countDocuments();

    return ResponseApi(res, 200, 'Analytics retrieved successfully', {
      donors,
      patients,
      organisations,
      donationLocations,
      bloodRequests,
    });
  }catch(error){
    return ResponseApi(res, 500, error instanceof Error ? error.message : 'An unknown error occurred while getting the analytics');
  }
}

const verifyAdmin = async (req: Request,res: Response) => {
  try{
    const { _id,role } = req.body;

    if(_id === undefined || role === undefined){
      return ResponseApi(res,403,'Forbidden');
    }

    const admin = await Admin.findById(_id);
    if(!admin){
      return ResponseApi(res,400,"No Such Admin")
    }
    
    admin.password = "********"

    return ResponseApi(res,200,'Admin verified successfully',admin);
  }catch(error){
    return ResponseApi(
      res,
      500,
      error instanceof Error
        ? error.message
        : 'An unknown error occurred while verifying the admin'
    )
  }
}

let otpMap = new Map<string, { otp: string; timestamp: number }>();

const sendOtpAdmin = async (req: Request, res: Response) => {
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

const verifyOtpAdmin = async (req: Request, res: Response) => {
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
    const { email ,password, otp } = req.body;

    if(!email || !password || !otp){
      return ResponseApi(res, 400, 'Please provide all required fields');
    }

    if(password.length < 6 || password.length > 20){
      return ResponseApi(res, 400, 'Password must be at least 6 and at most 20 characters');
    }

    const existingAdmin = await Admin.findOne({ email });
    if(!existingAdmin){
      return ResponseApi(res, 404, 'Admin not found');
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

    await Admin.findByIdAndUpdate(existingAdmin._id, { password: hashedPassword });

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

    await Admin.findByIdAndUpdate(
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
};
