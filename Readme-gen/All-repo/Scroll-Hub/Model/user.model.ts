import mongoose, { Schema, models, model } from 'mongoose';
import bcrypt from 'bcryptjs';

export interface IUser {
  _id?: mongoose.Types.ObjectId;
  reportedVideos?: mongoose.Types.ObjectId[];
  password: string;
  createdAt: Date;
  updatedAt: Date;
  email: string;
}

const userSchema = new Schema<IUser>(
  {
    email: {
      type: String,
      required: [true, 'Email is required'],
      unique: true,
      trim: true,
    },
    password: {
      type: String,
      required: [true, 'Password is required'],
      trim: true,
    },
    reportedVideos: {
      type: [mongoose.Schema.Types.ObjectId],
      ref: 'Video',
    }
  },
  {
    timestamps: true,
  },
);

userSchema.pre('save', async function (next) {
  if (this.isModified('password')) {
    this.password = await bcrypt.hash(this.password, 10);
  }
  next();
});

const User = models?.User || model<IUser>('User', userSchema);

export default User;
