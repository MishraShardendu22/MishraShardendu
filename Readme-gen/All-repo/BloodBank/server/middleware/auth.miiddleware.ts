import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import ResponseApi from '../utils/apiResponse.util';

const authMiddleware = (req: Request, res: Response, next: NextFunction) => {
  try {
    const token = req.header('Authorization')?.split(' ')[1];
    if (!token) {
      return ResponseApi(res, 401, 'Unauthorized');
    }

    jwt.verify(token, process.env.JWT_SECRET_KEY!, (error, user) => {
      if (error) {
        return ResponseApi(res, 403, 'Forbidden');
      }
      if (user) {
        req.body._id = (user as jwt.JwtPayload)?._id;
      } else {
        return ResponseApi(res, 403, 'Forbidden');
      }
    });
    next();
  } catch (error) {
    console.log(error);
    return ResponseApi(res, 500, 'Internal Server Error');
  }
};

export default authMiddleware;
