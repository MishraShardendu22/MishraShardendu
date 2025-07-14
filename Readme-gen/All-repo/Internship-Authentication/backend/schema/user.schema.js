import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
    {
        name : {
            type: String,
            required: [true,"This field is required"],
            trim: true,
        },
        email : {
            type: String,
            required: [true,"This field is required"],
            trim: true,
        },
        password : {
            type: String,
            required: [true,"This field is required"],
            trim: true,
        },
        gender : {
            type: String,
            required: [true,"This field is required"],
            trim: true,
            enum:["male","female"],
        },
        image : {
            type: String,
        },
        verified : {
            type: Boolean,
            default: false,
        }
    },
    {
        timestamps: true,
    }
)


const User = mongoose.model("User", userSchema);
export default User;