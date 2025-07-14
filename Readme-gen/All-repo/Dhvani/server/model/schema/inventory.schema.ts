import mongoose, { Schema, Document } from 'mongoose';

interface IInventory extends Document {
  OrganisationId: mongoose.Types.ObjectId;
  A_P: number;
  A_M: number;
  B_P: number;
  B_M: number;
  AB_P: number;
  AB_M: number;
  O_P: number;
  O_M: number;
}




const InventorySchema = new Schema<IInventory>(
  {
    OrganisationId: {
      type: Schema.Types.ObjectId,
      ref: 'Organisation',
      required: [true, 'OrganisationId is required'],
      trim: true,
    },
    A_P: {
      type: Number,
      default: 0,
      required: [true, 'A+ Quantity is required'],
    },
    A_M: {
      default: 0,
      type: Number,
      required: [true, 'A- Quantity is required'],
    },
    B_P: {
      default: 0,
      type: Number,
      required: [true, 'B+ Quantity is required'],
    },
    B_M: {
      default: 0,
      type: Number,
      required: [true, 'B- Quantity is required'],
    },
    AB_P: {
      default: 0,
      type: Number,
      required: [true, 'AB+ Quantity is required'],
    },
    AB_M: {
      default: 0,
      type: Number,
      required: [true, 'AB- Quantity is required'],
    },
    O_P: {
      default: 0,
      type: Number,
      required: [true, 'O+ Quantity is required'],
    },
    O_M: {
      default: 0,
      type: Number,
      required: [true, 'O- Quantity is required'],
    },
  },
  {
    timestamps: true,
  }
);

export { IInventory, InventorySchema };
