import mongoose from "mongoose";
import { ImageVariant, IProduct } from "./Types/product.types";

const productSchema = new mongoose.Schema<IProduct>(
    {
        name:{
            type: String,
            required: [true, "Name is required"],
        },
        description:{
            type: String,
            required: [true, "Name is required"],
        },
        imageUrl:{
            type: String,
            required: [true, "Name is required"],
        },
        variants:{
            type: [ImageVariant]
        }
    },
    {
        timestamps: true
    }
)

const Product = mongoose.model<IProduct>("Product", productSchema);
export default Product;