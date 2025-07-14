import { Schema, Document, Types } from 'mongoose';

interface IDonationLocation extends Document {
  organisationId: Types.ObjectId;
  name: string;
  contactDetails: string;
  location: string;
  timings: string;
  otherDetails?: string;
}


const DonationLocationSchema = new Schema<IDonationLocation>(
  {
    organisationId: {
      type: Schema.Types.ObjectId,
      ref: 'Organisation',
      required: [true, 'OrganisationId is required'],
      trim: true,
    },
    name: {
      type: String,
      required: [true, 'Name is required'],
      trim: true,
    },
    contactDetails: {
      type: String,
      required: [true, 'Contact details are required'],
      trim: true,
    },
    location: {
      type: String,
      required: [true, 'Location is required'],
      trim: true,
    },
    timings: {
      type: String,
      required: [true, 'Timings are required'],
      trim: true,
    },
  },
  {
    timestamps: true,
  }
);

export { IDonationLocation, DonationLocationSchema };