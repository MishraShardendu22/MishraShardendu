import mongoose from 'mongoose';
import dotenv from 'dotenv';
dotenv.config();
const MONGO_URI = process.env.MONGO_URI;
const connectDatabase = async () => {
    try {
        if (!MONGO_URI) {
            console.error('MONGO_URI is not defined in environment variables');
            process.exit(1);
        }
        await mongoose.connect(MONGO_URI);
        console.log('Database connected successfully');
    }
    catch (error) {
        console.error('Database connection failed:', error);
        process.exit(1);
    }
};
export { connectDatabase };
