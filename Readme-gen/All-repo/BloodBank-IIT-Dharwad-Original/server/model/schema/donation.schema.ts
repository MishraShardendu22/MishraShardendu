import { Schema, Document, Types } from 'mongoose';

interface IDonation extends Document {
  donorId: Types.ObjectId;
  quantity: string;
  organisationId: Types.ObjectId;
}



const DonationSchema = new Schema<IDonation>(
  {
    donorId: {
      type: Schema.Types.ObjectId,
      ref: 'Donor',
      required: [true, 'DonorId is required'],
      trim: true,
    },
    organisationId: {
      type: Schema.Types.ObjectId,
      ref: 'Organisation',
      required: [true, 'OrganisationId is required'],
      trim: true,
    },
    quantity: {
      type: String,
      required: [true, 'Quantity is required'],
      trim: true,
    },
  },
  {
    timestamps: true,
  }
);

export { IDonation, DonationSchema };