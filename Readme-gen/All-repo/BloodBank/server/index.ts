import express, { Request, Response } from 'express';
const app = express();

import morgan from 'morgan';

import dotenv from 'dotenv';
import { Connect } from './config/database.config';
dotenv.config();

import cors from 'cors';

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

// Import imports

import InventoryRouter from './route/inventory.route';
import AnalyticsRouter from './route/analytics.route';
import AdminRouter from './route/admin.route';
import AuthRouter from './route/auth.route';

// Import imports

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

app.use('/api/inventory', InventoryRouter);
app.use('/api/analytics', AnalyticsRouter);
app.use('/api/admin', AdminRouter);
app.use('/api/auth', AuthRouter);

// Routes Middleware

app.listen(port, () => {
  Connect();
  console.log(`Server is running at http://localhost:${port}`);
});
