import mongoose from "mongoose";
import cron from 'node-cron';
import User from "../schema/user.schema.js";

const connect = async () => {
    const MONGO_URI = process.env.MONGO_URI

    try{
        const connect = await mongoose.connect(MONGO_URI)
        console.log("MongoDB connected : In Database File".green.underline);
        
        cron.schedule('0 0 12 * *  *',async () => {
            try{
                const result = await User.deleteMany({verified: false});
            }catch(error){
                console.log(`Error: ${error}`.red.underline);
                process.exit(1);
            }
        })
 
    }catch(error){
        console.log(`Error: ${error}`.red.underline);
        process.exit(1);
    }
}

export default connect;