import { Schema, Document, Types } from 'mongoose';

interface IFile extends Document {
  filename: string;
  data: Buffer;
  contentType: string;
}


const FileSchema = new Schema<IFile>(
  {
    filename: {
      type: String,
      required: [true, 'Filename is required'],
      trim: true,
    },
    data: {
      type: Buffer,
      required: [true, 'Data is required'],
      trim: true,
    },
    contentType: {
      type: String,
      required: [true, 'Content type is required'],
      trim: true,
    },
  },
  {
    timestamps: true,
  }
);

export { IFile, FileSchema };