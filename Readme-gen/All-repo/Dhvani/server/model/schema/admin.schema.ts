import { Schema, Document } from 'mongoose';

interface IAdmin extends Document {
  name: string;
  email: string;
  password: string;
  phoneNo?: string;
}

const AdminSchema = new Schema<IAdmin>(
  {
    name: {
      type: String,
      required: [true, 'Please provide a name'],
      trim: true,
    },
    email: {
      type: String,
      required: [true, 'Please provide an email'],
      unique: true,
    },
    password: {
      type: String,
      required: [true, 'Please provide a password'],
    },
    phoneNo: {
      type: String,
      trim: true,
    },
  },
  {
    timestamps: true,
  }
);

export { IAdmin, AdminSchema };
