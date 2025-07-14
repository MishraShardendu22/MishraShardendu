import ResponseApi from '../utils/apiResponse.util';
import { Request, Response } from 'express';
import User from '../models/user.model';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

const register = async (req: Request, res: Response) => {
  try {
    const user = req.body;
    const existingUser = await User.findOne({ email: user.email });

    if (existingUser) {
      return ResponseApi(res, 400, 'User already exists');
    }

    const genSalt = bcrypt.genSaltSync(10);
    user.password = bcrypt.hashSync(user.password, genSalt);

    const newUser = new User(user);
    const savedUser = await newUser.save();

    return ResponseApi(res, 201, 'User created successfully', savedUser);
  } catch (error) {
    console.log(error);
    return ResponseApi(res, 500, 'Internal Server Error', error);
  }
};

const login = async (req: Request, res: Response) => {
  try {
    const user = req.body;
    const existingUser = await User.findOne({ email: user.email });

    if (!existingUser) {
      return ResponseApi(res, 404, 'User not found');
    }

    const validPassword = bcrypt.compareSync(
      user.password,
      existingUser.password
    );
    if (!validPassword) {
      return ResponseApi(res, 400, 'Invalid password');
    }

    if (!process.env.JWT_SECRET_KEY) {
      return ResponseApi(res, 500, 'JWT Secret Key is not defined');
    }

    const token = jwt.sign(
      { _id: existingUser._id },
      process.env.JWT_SECRET_KEY,
      { expiresIn: '1d' }
    );

    return ResponseApi(res, 200, 'Login successful', existingUser, token);
  } catch (error) {
    console.log(error);
    return ResponseApi(res, 500, 'Internal Server Error', error);
  }
};

const currentUser = async (req: Request, res: Response) => {
  try {
    const user = req.body;
    const existingUser = await User.findOne({ _id: user._id });

    if (!existingUser) {
      return ResponseApi(res, 404, 'User not found');
    }

    return ResponseApi(res, 200, 'User found', existingUser);
  } catch (error) {
    console.log(error);
    return ResponseApi(res, 500, 'Internal Server Error', error);
  }
};

const jwt_confirm = async (req: Request, res: Response) => {
  try {
    const { token } = req.body;
    if (!token) {
      return ResponseApi(res, 401, 'Unauthorized');
    }

    let user1;
    jwt.verify(token, process.env.JWT_SECRET_KEY!, (error: any, user: any) => {
      if (error) {
        return ResponseApi(res, 403, 'Forbidden');
      }
      if (!user) {
        return ResponseApi(res, 403, 'Forbidden');
      }
      user1 = user;
    });
    return ResponseApi(res, 200, 'Valid Token', user1);
  } catch (error) {
    console.log(error);
    return ResponseApi(res, 500, 'Internal Server Error', error);
  }
};

export { register, login, currentUser, jwt_confirm };
