import mongoose from "mongoose";

import dotenv from "dotenv";
dotenv.config();
const MONGO_URI=process.env.MONGO_URI;

export const dbConfig = async () => {
    try {
        const connect = await mongoose.connect(MONGO_URI)
        console.log("Connecting to the database : MongoDB Atlas".underline.bold.red);
        
        // testing ignore
        // console.log(connect) 
    } catch (err) {
        console.log("There was an error connecting to the database");
        console.log(err);
    }
}