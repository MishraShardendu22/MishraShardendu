import mongoose from 'mongoose';

const todoSchema = new mongooseSchema(
    {
        content : {
            type : String,
            required : [true,"This is a required Field !!"],
        },
        completed :{
            type : Boolean,
            default : false,
        },
        createdBy :{
            type : mongoose.Scheema.Types.ObjectId,
            ref : 'User',
        },
        subTodos : [
            {   
                type : mongoose.Schema.Types.ObjectId,
                ref : 'SubTodo',
            }
        ]
    },{timestamps : true});

export const Todo = new mongoose.model('Todo', todoSchema);