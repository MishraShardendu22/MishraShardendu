import { Schema, Document, Types } from 'mongoose';

interface ITBReport extends Document {
  userId: Types.ObjectId;
  file1: string;
  file2?: string;
  file3?: string;
  result?: string;
}


const TBReportSchema = new Schema<ITBReport>(
  {
    userId: {
      type: Schema.Types.ObjectId,
      ref: 'User',
      required: [true, 'userId is required'],
      trim: true,
    },
    file1: {
      type: String,
      required: [true, 'File 1 is required'],
      trim: true,
    },
    file2: {
      type: String,
      required: false,
      trim: true,
    },
    file3: {
      type: String,
      required: false,
      trim: true,
    },
    result: {
      type: String,
      required: false,
      trim: true,
    },
  },
  {
    timestamps: true,
  }
);

export { ITBReport, TBReportSchema };