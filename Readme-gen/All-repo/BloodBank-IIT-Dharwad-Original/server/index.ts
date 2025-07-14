import express, { Request, Response } from 'express';
const app = express();

import morgan from 'morgan';

import dotenv from 'dotenv';
dotenv.config();

import cors from 'cors';
import { Connect } from './config/database.config';

const CorsOption = {
  origin: process.env.CLIENT_URI,
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE'],
};
app.use(cors(CorsOption));

const port = process.env.PORT || 5000;

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(morgan('dev'));

// Import

import router from './route/route';

// Import

// ----------------------------------------------- //

// Test Route

// import TestRouter from './route/test.route';

if (process.env.NODE_ENV === 'development') {
  app.get('/', (req: Request, res: Response) => {
    res.send('Hello, TypeScript Backend!');
  });
  // app.use('',TestRouter);
}

// Test Route

// ----------------------------------------------- //

// Routes Middleware



app.use('/api/admin', router.AdminRouter);
app.use('/api/donor', router.DonorRouter);
app.use('/api/patient', router.PatientRouter);
app.use('/api/organisation', router.OrganisationRouter);

// Routes Middleware

app.listen(port, () => {
  Connect();
  console.log(`Server is running at http://localhost:${port}`);
});
