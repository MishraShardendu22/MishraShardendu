// import mongoose from "mongoose";
// import { db_name } from "../constants.js";

// const connectDB = async () => {
//     try {
//         const ConnectionInstance = await mongoose.connect(`${process.env.MONGODB_URI}/${db_name}`, {
//             writeConcern: { w: 'majority' } // Adjust as needed
//         });

//         // console.log(`Connected to MongoDB at host: ${ConnectionInstance.connection.host}`);
//     } catch (error) {
//         // console.error("There was an error connecting to the database:", error);
//         process.exit(1);
//     }
// }

// export default connectDB;


import mongoose from "mongoose";
import { db_name } from "../constants.js";

const connectDB = async () => {
    try{
        const ConnectionInstance = await mongoose.connect(`${process.env.MONGODB_URI}/${db_name}`,{writeConcern: { w: 'majority' }});
        // console.log(`\n Connected to the DataBase DB Host : ${ConnectionInstance}`);
        // console.log(`\n Connected to the DataBase DB Host : ${ConnectionInstance.connection.host}`); 
        // console.log("MongoDB URI:", process.env.MONGODB_URI);
    }catch(error){
        console.log("There was an error in connecting the DataBase",error);
        process.exit(1);
    }
}

export default connectDB;

// // https://mongoosejs.com/docs/connections.html
// // syntax - to connect to mongodb using mongoose