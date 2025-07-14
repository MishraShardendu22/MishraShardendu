import { Schema, Document } from 'mongoose';

interface IOrganisation extends Document {
  name: string;
  password: string;
  email: string;
  phoneNo?: string;
}

const OrganisationSchema = new Schema<IOrganisation>(
  {
    name: {
      type: String,
      required: [true, 'Please provide a name'],
      trim: true,
    },
    password: {
      type: String,
      required: [true, 'Please provide a password'],
    },
    email: {
      type: String,
      required: [true, 'Please provide an email'],
      unique: true,
      trim: true,
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

export { IOrganisation, OrganisationSchema };
