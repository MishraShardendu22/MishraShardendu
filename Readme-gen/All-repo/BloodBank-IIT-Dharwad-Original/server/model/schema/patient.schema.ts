import { Schema, Document } from 'mongoose';

interface IPatient extends Document {
  name: string;
  phoneNo?: string;
  email: string;
  password: string;
}



const PatientSchema = new Schema<IPatient>(
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
  },
  {
    timestamps: true,
  }
);

export { IPatient, PatientSchema };
