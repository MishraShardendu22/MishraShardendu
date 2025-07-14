// These 3 lines will always remain same in all the models that are defined by mongoose 
import mongoose from 'mongoose';

const userSchema = new mongoose.Schema(
    {
        username : {
            type : String,
            required : [true,"This is a required Field !!"],
            unique : [true,"This is a required Field !!"],
            lowercase : [true,"This is a required Field !!"],
        },
        email : {
            type : String,
            required : [true,"This is a required Field !!"],
            unique : [true,"This is a required Field !!"],
        },
        isActive : Boolean,
        password : {
            type : String,
            required : [true,"This is a required Field !!"],
        },
    },{timestamps : true}
)

// name of the model and the schema it is based on
// ie User model is based on userSchema
export const User = mongoose.model('User', userSchema);