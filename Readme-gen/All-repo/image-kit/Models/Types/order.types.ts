import mongoose from "mongoose";
import { ImageVariant } from "./product.types";

interface PoulateUser {
    _id: mongoose.Types.ObjectId;
    email: string;
}

interface PopulateProduct {
    _id: mongoose.Types.ObjectId;
    name: string;
    imageUrl: string;
}

export interface IOrder {
    _id: mongoose.Types.ObjectId;
    userId : mongoose.Types.ObjectId | PoulateUser;
    productId : mongoose.Types.ObjectId | PopulateProduct;
    variant: ImageVariant;
    razorpayOrderId: string;
    razorpayPaymentId?: string;
    amount: number;
    status: 'pending' | 'completed' | 'failed';
    downloadUrl: string;
    previewUrl: string;
    createdAt: Date;
    updatedAt: Date;
}