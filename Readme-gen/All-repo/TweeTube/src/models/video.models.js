import mongooseAggregatePaginate from "mongoose-aggregate-paginate-v2";
import mongoose,{ Schema } from "mongoose";

const videoSchema = new Schema(
    {
        videoFile : {
            type : String, // cloudinary url
            required : [true,"This is a required field"],
        },
        thumbnail : {
            type : String, // cloudinary url
            required : [true,"This is a required field"],
        },
        title : {
            type : String, // cloudinary url
            required : [true,"This is a required field"],
        },
        description : {
            type : String, // cloudinary url
            required : [true,"This is a required field"],
        },
        duration : {
            type : Number, // cloudinary url
            required : [true,"This is a required field"],
        },
        views : {
            type : Number, 
            required : 0,
        },
        isPublished : {
            type : Boolean,
            required : true,
        },
        owner : {
            type : Schema.Types.ObjectId,
            ref : "User"
        }
    },{timestamps:true}
);

videoSchema.plugin(mongooseAggregatePaginate);

export const Video = mongoose.model("Video",videoSchema) 