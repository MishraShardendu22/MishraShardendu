import { BloodRequest, Donation, DonationLocation, Donor, Inventory, Organisation, Patient } from '../model/model';
import { IOrganisation } from '../model/schema/organisation.schema';
import { IInventory } from '../model/schema/inventory.schema';
import ResponseApi from '../util/ApiResponse.util';
import { Request, Response } from 'express';
import { authenticator } from 'otplib';
import nodemailer from 'nodemailer';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs';

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

    const existingOrganisation = await Organisation.findOne({ email: email.toLowerCase() }) as IOrganisation | null;  
    if(existingOrganisation){
      return ResponseApi(res, 400, 'Organisation already exists');
    }
    const genSalt = await bcrypt.genSalt(5);
    const hashedPassword = await bcrypt.hash(password, genSalt);

    const newOrganisation: IOrganisation = new Organisation({
      name,
      email: email.toLowerCase(),
      password: hashedPassword,
      phoneNo,
    });

    const organisation = await newOrganisation.save();
    
    const newInventory: IInventory = new Inventory({
      OrganisationId: organisation._id
    })

    await newInventory.save();
    return ResponseApi(res, 201, 'Organisation registered successfully');
  } catch (error) {
    if (error instanceof Error) {
      return ResponseApi(res, 500, error.message);
    }
    return ResponseApi(
      res,
      500,
      'An unknown error occurred while registering the organisation'
    );
  }
};

const login = async (req: Request, res: Response) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return ResponseApi(res, 400, 'Please provide all required fields');
    }

    const existingOrganisation = await Organisation.findOne({ email: email.toLowerCase() }) as IOrganisation | null;
    if (!existingOrganisation) {
      return ResponseApi(res, 400, 'Organisation does not exist');
    }

    const isPasswordValid = await bcrypt.compare(password, existingOrganisation.password);
    if (!isPasswordValid) {
      return ResponseApi(res, 400, 'Invalid password');
    }

    if (!process.env.JWT_SECRET_KEY) {
      return ResponseApi(res, 500, 'JWT secret key is not defined');
    }

    const token = jwt.sign(
      { _id: existingOrganisation._id, role: 'organisation' },
      process.env.JWT_SECRET_KEY,
      { expiresIn: '30d' }
    );

    return ResponseApi(res, 200, 'Organisation logged in successfully ', token);
  } catch (error) {
    if (error instanceof Error) {
      return ResponseApi(res, 500, error.message);
    }
    return ResponseApi(
      res,
      500,
      'An unknown error occurred while logging in the organisation'
    );
  }
};

const addDonationLocation = async (req: Request, res: Response) => {
  try{
    const { _id,name,contactDetails,location,timings } = req.body;

    if(!name || !contactDetails || !location || !timings || !_id){
      return ResponseApi(res, 400, 'Please provide all required fields');
    }

    const newLocation = {
      organisationId: _id,
      contactDetails,
      location,
      timings,
      name,
    };


    await DonationLocation.create(newLocation);
    return ResponseApi(res, 201, 'Location added successfully');
  }catch(error){
    if(error instanceof Error){
      return ResponseApi(res, 500, error.message);
    }
    return ResponseApi(res, 500, 'An unknown error occurred while adding location');
  }
}

const deleteDonationLocation = async (req: Request, res: Response) => {
  try{
    const { locationId, _id } = req.body;

    if(!locationId || !_id){
      return ResponseApi(res, 400, 'Please provide all required fields');
    }

    const location = await DonationLocation.findOneAndDelete({
      _id: locationId,
      organisationId: _id
    });

    if(!location){
      return ResponseApi(res, 400, 'Location does not exist')
    }

    return ResponseApi(res, 200, 'Location deleted successfully');
  }catch(error){
    if(error instanceof Error){
      return ResponseApi(res, 500, error.message);
    }
    return ResponseApi(res, 500, 'An unknown error occurred while deleting location');
  }
}

const updateDonationLocation = async (req: Request, res: Response) => {
  try{
    const { _id,name,contactDetails,location,timings,locationId } = req.body;

    if(!name || !contactDetails || !location || !timings || !_id || !locationId){
      return ResponseApi(res, 400, 'Please provide all required fields');
    }

    const newLocation = {
      organisationId: _id,
      contactDetails,
      location,
      timings,
      name,
    };

    const update = await DonationLocation.findOneAndUpdate({
      _id: locationId,
      organisationId: _id
    }, newLocation);
    if(!update){
      return ResponseApi(res, 400, 'Location could not be updated');
    }
    return ResponseApi(res, 200, 'Location updated successfully');
  }catch(error){
    if(error instanceof Error){
      return ResponseApi(res, 500, error.message);
    }
    return ResponseApi(res, 500, 'An unknown error occurred while updating location');
  }
}

const getInventory= async (req: Request, res: Response) => {
  try {
    const { _id } = req.body;

    if (!_id) {
      return ResponseApi(res, 400, 'Please provide all required fields');
    }

    const MyInventory = await Inventory.findOne({
      OrganisationId: _id
    })
    
    return ResponseApi(res, 200, 'Blood requests retrieved successfully', MyInventory);
  } catch (error) {
    return ResponseApi(res, 500, 'An unknown error occurred while getting the blood requests');
  }
}

const updateInventory = async (req: Request, res: Response) => {
  try {
    const { _id, A_P, A_M, B_P, B_M, AB_P, AB_M, O_P, O_M } = req.body;

    if (A_P < 0 || A_M < 0 || B_P < 0 || B_M < 0 || AB_P < 0 || AB_M < 0 || O_P < 0 || O_M < 0 || _id) {
      return ResponseApi(res, 400, 'Quantity cannot be negative');
    }

    const inventory = await Inventory.findOneAndUpdate(
      { OrganisationId: _id },
      {
        A_P,
        A_M,
        B_M,
        B_P,
        AB_M,
        AB_P,
        O_M,
        O_P
      },
      {returnDocument: 'after'}
    );

    if (!inventory) {
      return ResponseApi(res, 404, 'Inventory not found');
    }

    return ResponseApi(res, 200, 'Inventory updated successfully', inventory);
  } catch (error) {
    return ResponseApi(res, 500, error instanceof Error ? error.message : 'An unknown error occurred while updating inventory');
  }
};

const getBloodRequests = async (req: Request, res: Response) => {
  try {
    const bloodRequests = await BloodRequest.find().populate({
      path: 'patientId',
      select: 'name email phoneNo'
    });
    return ResponseApi(res, 200, 'Blood requests retrieved successfully', bloodRequests);
  } catch (error) {
    return ResponseApi(res, 500, 'An unknown error occurred while getting the blood requests');
  }
}

const completeBloodRequest = async (req: Request, res: Response) => {
  try{
    const { requestId } = req.body;

    if(!requestId){
      return ResponseApi(res, 400, 'Please provide all required fields');
    }

    const bloodRequest = await BloodRequest.findById(requestId);

    if(!bloodRequest){
      return ResponseApi(res, 404, 'Blood request not found');
    }

    await BloodRequest.findByIdAndUpdate(requestId, { completed: true });
    return ResponseApi(res, 200, 'Blood request completed successfully');
  }catch(error){
    return ResponseApi(res, 500, 'An unknown error occurred while completing the blood request');
  }
}

const addBloodDonated = async (req: Request, res: Response) => {
  try{
    const { donorEmail, quantity, _id } = req.body;
    if(!donorEmail || !quantity || !_id){
      return ResponseApi(res, 400, 'Please provide all required fields');
    }

    if(quantity < 0){
      return ResponseApi(res, 400,  'quantity can\'t be negative');
    }

    const donor = await Donor.findOne({
      email: donorEmail
    });

    if(!donor){
      return ResponseApi(res, 400, 'Donor not found');
    }

    const newRequest = {
      donorId: donor._id,
      organisationId: _id,
      quantity
    };

    await Donation.create(newRequest);

    return ResponseApi(res, 201, 'Blood donation added successfully');
    }catch(error){
    return ResponseApi(res, 500, 'An unknown error occurred while adding blood donation');
  }
}

const verifyOrganisation = async (req: Request,res: Response) => {
  try{
    const { _id,role } = req.body;

    if(_id === undefined || role === undefined){
      return ResponseApi(res,403,'Forbidden');
    }

    const org = await Organisation.findById(_id);
    if(!org){
      return ResponseApi(res,400,"No Such organisation")
    }
    
    org.password = "********"
    return ResponseApi(res,200,'Organisation verified successfully',org);
  }catch(error){
    return ResponseApi(
      res,
      500,
      error instanceof Error
        ? error.message
        : 'An unknown error occurred while verifying the org'
    )
  }
}

const getDonationLocations = async (req: Request, res: Response) => {
  try {
    const { _id } = req.body;

    if (!_id) {
      return ResponseApi(res, 400, 'Please provide all required fields');
    }

    const locations = await DonationLocation.find({ organisationId: _id });
    return ResponseApi(res, 200, 'Donation locations retrieved successfully', locations);
  } catch (error) {
    if (error instanceof Error) {
      return ResponseApi(res, 500, error.message);
    }
    return ResponseApi(res, 500, 'An unknown error occurred while getting donation locations');
  }
};

const getAnalytics = async (req: Request, res: Response) => {
  try{
    
    const organisations = await Organisation.countDocuments();
    const donationLocations = await DonationLocation.countDocuments();
    const bloodRequests = await BloodRequest.countDocuments();

    return ResponseApi(res, 200, 'Analytics retrieved successfully', {
      organisations,
      donationLocations,
      bloodRequests,
    });
  }catch(error){
    return ResponseApi(res, 500, error instanceof Error ? error.message : 'An unknown error occurred while getting the analytics');
  }
}

let otpMap = new Map<string, { otp: string; timestamp: number }>();

const sendOtpOrganisation = async (req: Request, res: Response) => {
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

const verifyOtpOrganisation = async (req: Request, res: Response) => {
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

    const existingOrganisation = await Organisation.findOne({ email });
    if(!existingOrganisation){
      return ResponseApi(res, 404, 'Organisation not found');
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

    await Organisation.findByIdAndUpdate(existingOrganisation._id, { password: hashedPassword });

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

    await Organisation.findByIdAndUpdate(
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
};