import { Schema, Document, Types } from 'mongoose';

interface IStrokeReport extends Document {
  userId: Types.ObjectId;
  data: string;
  result: string;
}


const StrokeReportSchema = new Schema<IStrokeReport>(
  {
    userId: {
      type: Schema.Types.ObjectId,
      ref: 'User',
      required: [true, 'userId is required'],
      trim: true,
    },
    data: {
      type: String,
      required: [true, 'Data is required'],
      trim: true,
    },
    result: {
      type: String,
      required: [true, 'Result is required'],
      trim: true,
    },
  },
  {
    timestamps: true,
  }
);

export { IStrokeReport, StrokeReportSchema };