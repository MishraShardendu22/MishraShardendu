import mongoose from "mongoose";

const arraySchema = new mongoose.Schema(
    {
        array: {
            type: [String],
        },
    }
);

const Array = mongoose.model('Array', arraySchema);
export default Array;