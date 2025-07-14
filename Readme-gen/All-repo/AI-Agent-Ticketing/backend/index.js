import cors from 'cors';
import morgan from 'morgan';
import express from 'express';
import { connectDatabase } from './database/connect.database.js';
import dotenv from 'dotenv';
import { serve } from 'inngest/express';
import { inngest } from './inngeest/index.inngest.js';
import { onCreateTicker } from './inngeest/workers/on-createticket.js';
import { onSignUp } from './inngeest/workers/on-signup.js';
dotenv.config();

import userRouter from "./routes/user.route.js"
import ticketRouter from "./routes/ticket.route.js";

const app = express();
const PORT = process.env.PORT || 3000;
app.use(cors());
app.use(morgan('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
// Test route
app.get('/', (req, res) => {
    res.status(200).json({
        message: 'Test route is working',
    });
});
// Test route
app.use("/api/user", userRouter);
app.use("/api/ticket", ticketRouter);

app.use("/api/inngest", serve({
    client: inngest,
    functions: [onSignUp, onCreateTicker],
}));

app.listen(PORT, () => {
    connectDatabase();
    console.log(`Server is running on port ${PORT}`);
    console.log("Click to conenct http://localhost:" + PORT);
});
