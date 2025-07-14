import mongoose,{ Schema } from "mongoose";
import mongooseAggregatePaginate from "mongoose-aggregate-paginate-v2";
import jwt from "jsonwebtoken";
import bcrypt  from "bcrypt";

const userSchema = new Schema(
    {
        username : {
            type : String,
            required : [true,"This is a required field"],
            unique : true,
            lowercase : true,
            trim : true,
            index : true
        },
        email : {
            type : String,
            required : [true,"This is a required field"],
            unique : true,
            lowercase : true,
            trim : true,
        },
        fullname: {    
            type: String,    
            required: [true, "This is a required field"],    
            trim: true,    
            index: true,
        },
        avatar : {
            type : String, // cloudinary url
            required : true,
        },
        coverImage : {
            type : String, // cloudinary url
        },
        watchHistory : [
            {
                type : Schema.Types.ObjectId,
                ref : "Video",
            }
        ],
        password : {
            type : String,
            required : [true,"This is a required field"],
        },
        refreshToken : {
            type : String,
        }
    },{timestamps:true}
);

userSchema.pre("save",async function(next){
    if(!this.isModified("password")){
        next();
    }
    this.password = await bcrypt.hash(this.password,10);
    next();
});

userSchema.methods.isPasswordMatch = async function(enteredPassword){
    return await bcrypt.compare(enteredPassword,this.password);
}

userSchema.methods.generateAccessToken = function() {
    return jwt.sign({ id: this._id }, process.env.ACCESS_TOKEN_SECRET, {
        expiresIn: process.env.ACCESS_TOKEN_EXPIRY
    });
};

userSchema.methods.generateRefreshToken = function() {
    return jwt.sign({ id: this._id }, process.env.REFRESH_TOKEN_SECRET, {
        expiresIn: process.env.REFRESH_TOKEN_EXPIRY
    });
};


export const User = mongoose.model("User",userSchema) 

// to enable search index : true
// middleware - jaane se pehle mujhse milke jaana


//access token short lived 
//refresh token long lived