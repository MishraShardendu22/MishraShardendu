import express from "express";
import dotenv from 'dotenv';
import dbConnect from "./DB/dbConnect.js";
import authRouter from './rout/authUser.js';
import messageRouter from './rout/messageRout.js';
import userRouter from './rout/userRout.js';
import cookieParser from "cookie-parser";
import path from "path";
import { app, server } from './Socket/socket.js';
import { fileURLToPath } from 'url';
import { dirname } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

dotenv.config();

// Middlewares
app.use(express.json());
app.use(cookieParser());

// API Routes
app.use('/api/auth', authRouter);
app.use('/api/message', messageRouter);
app.use('/api/user', userRouter);

// Serve static front-end from 'dist'
app.use(express.static(path.join(__dirname, "dist")));

// Serve front-end for all other routes
app.get("*", (req, res) => {
    res.sendFile(path.join(__dirname, "dist", "index.html"));
});

// Start server
const PORT = process.env.PORT || 3000;

server.listen(PORT, () => {
    dbConnect();
    console.log(`Working at ${PORT}`);
});
