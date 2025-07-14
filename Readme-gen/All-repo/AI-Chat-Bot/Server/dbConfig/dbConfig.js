import mongoose from "mongoose";

const dbConfig = async () => {
    try{
        await mongoose.connect(process.env.MONGO_URI);
        console.log("Connected to Database".underline.green);
    }catch(error){
        console.log("Trouble Connecting to Databse");
        console.log(error);
        process.exit(1);
    }
}

export default dbConfig;