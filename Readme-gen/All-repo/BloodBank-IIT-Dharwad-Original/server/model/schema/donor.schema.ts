import { Schema, Document } from 'mongoose';

interface IDonor extends Document {
  name: string;
  email: string;
  phoneNo?: string;
  password: string;
}



const DonorSchema = new Schema<IDonor>(
  {
    name: {
      type: String,
      required: [true, 'Name is required'],
      trim: true,
    },
    email: {
      type: String,
      required: [true, 'Email is required'],
      trim: true,
      unique: true,
    },
    phoneNo: {
      type: String,
      trim: true,
    },
    password: {
      type: String,
      required: [true, 'Password is required'],
    },
  },
  {
    timestamps: true,
  }
);

export { IDonor, DonorSchema };
