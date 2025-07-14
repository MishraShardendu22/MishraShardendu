import { Schema, Document, Types } from 'mongoose';

interface IDiseaseDetection extends Document {
  userId: Types.ObjectId;
  file1: string;
  file2?: string;
  file3?: string;
  currentSymptoms: string;
  previousDiseases: string;
  result?: string;
}


const DiseaseDetectionSchema = new Schema<IDiseaseDetection>(
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
    currentSymptoms: {
      type: String,
      required: [true, 'Current symptoms are required'],
      trim: true,
    },
    previousDiseases: {
      type: String,
      required: [true, 'Previous diseases are required'],
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

export { IDiseaseDetection, DiseaseDetectionSchema };