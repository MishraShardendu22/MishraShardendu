import mongoose, { Schema } from "mongoose";
import { IOrder } from "./Types/order.types";
import { ImageVariantType } from "./Types/product.types";


const orderSchema = new mongoose.Schema<IOrder>(
    {
        userId: {
            type: Schema.Types.ObjectId,
            ref: "User",
            required: [true, "User is required"]
        },
        productId: {
            type: Schema.Types.ObjectId,
            ref: "Product",
            required: [true, "Product is required"]
        },
        variant: {
            type : {
                type: String,
                required: [true, "Variant is required"],
                enum: ["SQUARE", "WIDE", "POTRAIT"] as ImageVariantType[],
                set: (value: string) => value.toUpperCase()
            },
            price: {
                type: Number,
                required: [true, "Price is required"]
            },
            license: {
                type: String,
                required: [true, "License is required"],
                enum: ["personal", "commercial"]
            },
        },
        razorpayOrderId: {
            type: String,
            required: [true, "Razorpay Order Id is required"]
        },
        razorpayPaymentId: {
            type: String,
        },
        amount: {
            type: Number,
            required: [true, "Amount is required"]
        },
        status: {
            type: String,
            required: [true, "Status is required"],
            enum: ["pending", "completed", "failed"],
            default: "pending"
        },
        downloadUrl: {
            type: String,
            required: [true, "Download Url is required"]
        },
        previewUrl: {
            type: String,
            required: [true, "Preview Url is required"]
        }
    },
    {
        timestamps: true
    }
)

const Order = mongoose.model<IOrder>("Order", orderSchema);
export default Order;