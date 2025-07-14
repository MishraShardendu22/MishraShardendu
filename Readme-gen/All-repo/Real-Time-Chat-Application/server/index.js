import express from "express";
const app = express();

import cookieParser from 'cookie-parser';
app.use(cookieParser());
// wont read cookies if this isnt included

app.use(express.json());
app.use(express.urlencoded({ extended: true }));


import dotenv from "dotenv";
dotenv.config();
const PORT = process.env.PORT || 5000


import { dbConfig } from "./dbConfig/dbConfig.js";
import colors from "colors";


import cors from "cors"
const corsOption = {
    origin: process.env.CLIENT_URL,
    methods : ["GET","POST","PUT","PATCH","DELETE"],
}
app.use(cors(corsOption));


import messageRoute from "./route/message.route.js"
import authRoute from "./route/auth.route.js"
import userRoute from "./route/user.route.js"


// testing ignore

// app.get("/", (req, res) => {
//     res.send("This is in Testing!");
// })

// till here


// Route Access will go Here

app.use("/api/message", messageRoute);
app.use("/api/auth", authRoute);
app.use("/api/user", userRoute);

// till here


app.listen(PORT, () => {
    dbConfig();
    console.log(`Click to connect to the server: http://localhost:${process.env.PORT}`.green.bold.underline);
    console.log(`Server is running on port ${process.env.PORT}`.bold.cyan.underline);
})

// import bodyParser from "body-parser";
// app.use(bodyParser.json());

// what is the use of body-parser
// body-parser is a middleware in Node.js that is used to handle incoming request bodies in various formats, 
// particularly in web applications built with Express.js or other similar frameworks. 
// It parses the incoming request body and makes it accessible under the req.body property.