import mongoose from "mongoose";

export interface IUser {
    _id: mongoose.Types.ObjectId;
    email: string;
    password: string;
    role: 'admin' | 'user';
    createdAt: Date;
    updatedAt: Date;
}