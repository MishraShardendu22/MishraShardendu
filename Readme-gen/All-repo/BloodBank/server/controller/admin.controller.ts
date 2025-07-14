import { Request, Response } from 'express';
import ResponseApi from '../utils/apiResponse.util';
import User from '../models/user.model';

const getAlldonor = async (req: Request, res: Response) => {
  try {
    const donorData = await User.find({ role: 'donor' }).sort({
      createdAt: -1,
    });

    return ResponseApi(res, 200, 'Successfully Fetched Data', donorData);
  } catch (error) {
    console.log(error);
    return ResponseApi(res, 500, 'Server Error While fetching data');
  }
};

const getAllHospital = async (req: Request, res: Response) => {
  try {
    const hospitalData = await User.find({ role: 'hospital' }).sort({
      createdAt: -1,
    });

    return ResponseApi(res, 200, 'Successfully Fetched Data', hospitalData);
  } catch (error) {
    console.log(error);
    return ResponseApi(res, 500, 'Server Error While fetching data');
  }
};

const getAllOrganistaion = async (req: Request, res: Response) => {
  try {
    const orgData = await User.find({ role: 'organisation' }).sort({ createdAt: -1 });

    return ResponseApi(res, 200, 'Successfully Fetched Data', orgData);
  } catch (error) {
    console.log(error);
    return ResponseApi(res, 500, 'Server Error While fetching data');
  }
};

const deleteUser = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    await User.findByIdAndDelete(id);
    return ResponseApi(res, 200, 'Successfully Deleted Data');
  } catch (error) {
    console.log('Error', error);
    return ResponseApi(res, 500, 'Server Error While Deleting Data');
  }
};

export { getAlldonor, getAllHospital, getAllOrganistaion, deleteUser };
