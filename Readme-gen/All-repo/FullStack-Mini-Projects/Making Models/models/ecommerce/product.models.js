import mongoose from 'mongoose';
import { Category } from './category.models';

const productSchema = new mongoose.Scehma(
    {
        description : {
            type : String,
            trim : true,
            required : [true,"This is a required field"],
            maxlength : 2000,
        },
        name : {
            type : String,
            required : [true,"This is a required field"],
            default : 'Phone',
        },
        category : {
            type : mongoose.Schema.Types.ObjectId,
            ref : Category,
        },
        price : {
            type : Number,
            required : [true,"This is a required field"],
            default : 0,
        },
        images : {
            type : String,
        },
        stock : {
            type : Number,
        },
        owner : {
            type : mongoose.Schema.Types.ObjectId,
            ref : 'User',
        }
    },{timestamps: true}
)

export const Product = mongoose.model('Product',productSchema)