import { NextFunction, Request, Response } from 'express';
import User from '../models/user.model';
import ResponseApi from '../utils/apiResponse.util';

const adminMiddleware = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { _id } = req.body;
    if (!_id) {
      return ResponseApi(res, 400, 'Missing required fields');
    }

    const user = await User.findOne({ _id });
    if (!user) {
      return ResponseApi(res, 404, 'User not found');
    }

    next();
  } catch (error) {
    console.log(error);
    return ResponseApi(res, 500, 'Internal Server Error');
  }
};

export default adminMiddleware;
