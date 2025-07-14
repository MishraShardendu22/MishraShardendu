import mongoose from 'mongoose';

const userSchema = new mongoose.Schema(
    {
        name: {
            type: String,
            trim: true,
            required: [true,"This is a required field"],
            maxlength: 32
        },
        email: {
            type: String,
            trim: true,
            required: [true,"This is a required field"],
            unique: [true,"Email already exists"],
            match : [/.+\@.+\..+/,"Please fill a valid email address"]
        
        },
        password: {
            type: String,
            required: [true,"This is a required field"]
        },

    },{timestamps : true}
);

export const User = mongoose.model('User', userSchema);