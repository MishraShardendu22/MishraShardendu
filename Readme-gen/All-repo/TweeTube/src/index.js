import { app } from "./app.js";
import dotenv from "dotenv";
import connectDB from "./db/index.js"; 

dotenv.config({
    path: "./.env"
});

connectDB()
    .then(() => {
        app.listen(process.env.PORT || 8000, () => {
            console.log(`Server is running on port ${process.env.PORT || 8000}`);
        });
    })
    .catch((error) => {
        console.log("There was an error in connecting the database:", error);
        process.exit(1);
    });

