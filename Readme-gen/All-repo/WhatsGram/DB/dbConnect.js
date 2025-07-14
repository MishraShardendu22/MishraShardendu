import mongoose from "mongoose";
import dotenv from 'dotenv';
dotenv.config();

const dbConnect = async () => {
    try {
        await mongoose.connect('mongodb+srv://shardendumishra22:shardendu1234@cluster0.lsaay.mongodb.net');
        console.log("DB connected successfully");
    } catch (error) {
        console.error("DB connection error:", error);
    }
};

export default dbConnect;