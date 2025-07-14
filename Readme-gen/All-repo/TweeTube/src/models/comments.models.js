import mongoose from "mongoose";
import mongooseAggregatePaginate from "mongoose-aggregate-paginate-v2";

const commentSchema = new mongoose.Schema(
    {
        content : {
            type : String,
            required : [true, "Content is required"]
        },
        video : {
            type : mongoose.Schema.Types.ObjectId,
            ref : "Video"
        },
        owner : {
            type : mongoose.Schema.Types.ObjectId,
            ref : "User"
        },
    },{timestamps:true}
)

commentSchema.plugin(mongooseAggregatePaginate);
export const Comment = mongoose.model("Comment", commentSchema);