import { connect } from 'mongoose';
import dotenv from 'dotenv';
dotenv.config();

const MONGO_URI = process.env.MONGO_URI;

const Connect = async () => {
  try {
    const connection = await connect(MONGO_URI!);
    console.log(`Connected to MongoDB: ${connection.connection.host}`);
  } catch (error) {
    console.error(`Error: ${(error as Error).message}`);
    process.exit(1);
  }
};

export { Connect };
