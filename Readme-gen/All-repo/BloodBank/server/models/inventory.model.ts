import mongoose, { Schema, Document, model } from 'mongoose';

interface IInventory extends Document {
  inventoryType: 'in' | 'out';
  bloodGroup: 'A+' | 'A-' | 'B+' | 'B-' | 'AB+' | 'AB-' | 'O+' | 'O-';
  quantity: number;
  email: string;
  organisation: mongoose.Types.ObjectId;
  hospital?: mongoose.Types.ObjectId;
  donor?: mongoose.Types.ObjectId;
}

const inventorySchema = new Schema<IInventory>(
  {
    inventoryType: {
      type: String,
      required: [true, 'Inventory Type is required'],
      enum: ['in', 'out'],
    },
    bloodGroup: {
      type: String,
      required: [true, 'Blood Group is required'],
      enum: ['A+', 'A-', 'B+', 'B-', 'AB+', 'AB-', 'O+', 'O-'],
    },
    quantity: {
      type: Number,
      required: [true, 'Quantity is required'],
    },
    email: {
      type: String,
      required: [true, 'Email is required'],
    },
    organisation: {
      type: Schema.Types.ObjectId,
      ref: 'users',
      required: [true, 'Organisation is required'],
    },
    hospital: {
      type: Schema.Types.ObjectId,
      ref: 'users',
      required: function (this: IInventory) {
        return this.inventoryType === 'out';
      },
    },
    donor: {
      type: Schema.Types.ObjectId,
      ref: 'users',
      required: function (this: IInventory) {
        return this.inventoryType === 'in';
      },
    },
  },
  {
    timestamps: true,
  }
);

const Inventory = model<IInventory>('Inventory', inventorySchema);
export default Inventory;
