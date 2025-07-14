import { model, Schema, Document } from 'mongoose';

const ROLE = ['admin', 'donor', 'hospital', 'organisation'] as const;

interface IUser extends Document {
  role: (typeof ROLE)[number];
  name: string;
  organisationName?: string;
  hospitalName?: string;
  email: string;
  password: string;
  website?: string;
  address: string;
  phone: string;
}

// User schema
const userSchema = new Schema<IUser>(
  {
    role: {
      type: String,
      required: [true, 'Role is a required field'],
      enum: ROLE,
    },
    name: {
      type: String,
      required: function (this: IUser) {
        return this.role === 'admin' || this.role === 'donor';
      },
    },
    organisationName: {
      type: String,
      required: function (this: IUser) {
        return this.role === 'organisation';
      },
    },
    hospitalName: {
      type: String,
      required: function (this: IUser) {
        return this.role === 'hospital';
      },
    },
    email: {
      type: String,
      required: [true, 'Email is a required field'],
      unique: true,
    },
    password: {
      type: String,
      required: [true, 'Password is a required field'],
    },
    website: {
      type: String,
    },
    address: {
      type: String,
      required: [true, 'Address is a required field'],
    },
    phone: {
      type: String,
      required: [true, 'Phone is a required field'],
    },
  },
  {
    timestamps: true,
  }
);

const User = model<IUser>('User', userSchema);
export default User;
