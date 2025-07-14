import mongoose, {} from "mongoose";
import { IUser } from "./Types/user.types"
import bcrypt from "bcryptjs";

const userSchema = new mongoose.Schema<IUser>(
    {
        email:{
            type: String,
            required: [true, "Email is required"],
            unique: true
        },
        password:{
            type: String,
            required: [true, "Email is required"],
        },
        role:{
            type: String,
            required: [true, "Email is required"],
            enum: ['admin', 'user'],
            default: 'user',
        },
    },
    {
        timestamps: true
    }
)

userSchema.pre("save",async function (next){
    if(this.isModified("password")){
        this.password = await bcrypt.hash(this.password, 10);
    }
    next();
})

const User = mongoose.model<IUser>("User", userSchema);
export default User;