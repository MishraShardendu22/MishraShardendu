import mongoose from 'mongoose';

const orderItemSchema = new mongoose(
    {
        productId : {
            type : mongoose.Schema.Types.ObjectId,
            ref : 'Product',
        },
        quantity : {
            type : Number,
            required : [true,"This is a required field"],
            default : 1,
        }
    }
)

const orderSchema = new mongoose.Schema(
    {
        price : {
            type : Number,
            required : [true,"This is a required field"],
        },
        customer : {
            type : mongoose.Schema.Types.ObjectId,
            ref : 'User',
        },
        quantity : {
            types : [orderItemSchema]
        },
        address : {
            type : String,
            required : [true,"This is a required field"],
        }
    },{timestamps: true}
)

export const Order = mongoose.model('Order', orderSchema)