import { Schema, Document } from 'mongoose';

interface IUser extends Document {
  name: string;
  phoneNo?: string;
  email: string;
  password: string;
  height: number;
  weight: number;
  bloodGroup: 'A+' | 'A-' | 'B+' | 'B-' | 'AB+' | 'AB-' | 'O+' | 'O-';
  gender: 'male' | 'female' | 'other';
  dateOfBirth: Date;
  address?: string;
  aadharNo: string;
}



const UserSchema = new Schema<IUser>(
  {
    name: {
      type: String,
      required: [true, 'Please provide a name'],
      trim: true,
    },
    phoneNo: {
      type: String,
      trim: true,
    },
    email: {
      type: String,
      required: [true, 'Please provide an email'],
      unique: true,
      trim: true,
    },
    password: {
      type: String,
      required: [true, 'Please provide a password'],
      trim: true,
    },
    height: {
      type: Number,
      required: [true, 'Please provide a height'],
      trim: true,
    },
    weight: {
      type: Number,
      required: [true, 'Please provide a weight'],
      trim: true,
    },
    bloodGroup: {
      type: String,
      required: [true, 'Please provide a blood group'],
      trim: true,
      enum: {
        values: ['A+', 'A-', 'B+', 'B-', 'AB+', 'AB-', 'O+', 'O-'],
        message: '{VALUE} is not a valid blood group',
      },
    },
    gender: {
      type: String,
      required: [true, 'Please provide a gender'],
      trim: true,
      enum: {
        values: ['male', 'female', 'other'],
        message: '{VALUE} is not a valid gender',
      },
    },
    dateOfBirth: {
      type: Date,
      required: [true, 'Please provide a date of birth'],
      trim: true,
    },
    address: {
      type: String,
      trim: true,
    },
    aadharNo: {
      type: String,
      length: 12,
      required: [true, 'Please provide an Aadhar number'],
      trim: true,
    }
  },
  {
    timestamps: true,
  }
);

export { IUser, UserSchema };
