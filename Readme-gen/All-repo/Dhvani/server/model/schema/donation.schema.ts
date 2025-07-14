import { Schema, Document, Types } from 'mongoose';

interface IDonation extends Document {
  userId: Types.ObjectId;
  quantity: string;
  organisationId: Types.ObjectId;
}



const DonationSchema = new Schema<IDonation>(
  {
    userId: {
      type: Schema.Types.ObjectId,
      ref: 'User',
      required: [true, 'userId is required'],
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