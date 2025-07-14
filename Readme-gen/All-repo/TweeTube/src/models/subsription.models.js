import mongoose,{ Schema } from "mongoose";

const subscriptionSchema = new Schema(
    {
        subsricber : {
            type : Schema.Types.ObjectId,
            ref : "User",
        },
        channel : {
            type : Schema.Types.ObjectId,
            ref : "User",
        },
    },{timestamps:true}
);

export const Subscription =  mongoose.model("Subscription", subscriptionSchema);