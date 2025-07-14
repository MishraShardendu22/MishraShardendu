import express, { json, urlencoded } from 'express';
import SignUpRoute from "./route/signup.route.js"
import LogOutRoute from "./route/logout.route.js"
import ResetRoute from "./route/reset.route.js"
import LogInRoute from "./route/login.route.js"
import OtpRoute from "./route/verify.route.js"
import ValidRoute from "./route/auth.route.js"
import UserRoute from "./route/user.route.js"

import connect from './database/connect.database.js';
import cookieParser from 'cookie-parser';
import dotenv from 'dotenv';
import colors from 'colors';

import cors from 'cors';
dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

app.use(urlencoded({extended: true}));
app.use(cookieParser());
app.use(json());

const corsOptions = {
  methods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE'],
  origin: process.env.CLIENT_URL,
  credentials: true,
};
app.use(cors(corsOptions));

// TESTING ROUTE

// app.get('/', (req, res) => {
//   res.send('This is a Test !!');
// });

// TESTING ROUTE

app.use('/api',LogInRoute)
app.use('/api',SignUpRoute)
app.use('/api',LogOutRoute)
app.use('/api',OtpRoute)
app.use('/api',ValidRoute)
app.use('/api',UserRoute)
app.use('/api',ResetRoute)

// Server Listen
app.listen(PORT, () => {
  connect();
  console.log("Server Started \n")
  console.log(`Server is running on http://localhost:${PORT}`.blue.bold);
});