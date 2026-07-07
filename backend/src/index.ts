import dns from "node:dns/promises";

dns.setServers(["1.1.1.1"]);

import express, { Express, NextFunction, Request, Response } from 'express';
import dotenv from 'dotenv';
import { connectToCluster } from './cluster';
import MongoStore from 'connect-mongo';
import session from 'express-session';
import { BaseError } from './errors/CustomError';
import authRoutes from './routes/AuthRoutes';
import userRoutes from './routes/UserRoutes';
import currencyRoutes from './routes/CurrencyRoutes';
import transactionRoutes from './routes/TransactionRoutes';
import categoryRoutes from "./routes/CategoryRoutes";
import authMiddleware from './middleware/auth';
import cors from 'cors';
import mongoose from "mongoose";


dotenv.config();

const app = express();
const corsOptions = {
  origin: true,
  credentials: true
};

app.use(cors(corsOptions));
app.use(express.json());

const port = process.env.PORT || 5000;

const dbUser = process.env.DB_USER as string;
const dbPassword = process.env.DB_PASSWORD as string;

// Session middleware
app.use(
  session({
    secret: 'test', // Extract to env later
    resave: false,
    saveUninitialized: false,
    cookie: {
      httpOnly: true,
      maxAge: 60 * 60 * 1000,
      secure: process.env.RUNNING_ENV === 'production',
      sameSite: process.env.RUNNING_ENV === 'production' ? 'none' : 'lax'
    },
    rolling: true, // If the user is actively using the application, their token won't just expire even if the time is over
    store: MongoStore.create({
      // Declare our storage/DB where we'd like to store our session information
      mongoUrl: `mongodb://${dbUser}:${dbPassword}@ac-yv0bsb6-shard-00-00.rywcuzx.mongodb.net:27017,ac-yv0bsb6-shard-00-01.rywcuzx.mongodb.net:27017,ac-yv0bsb6-shard-00-02.rywcuzx.mongodb.net:27017/?ssl=true&replicaSet=atlas-tvrczg-shard-0&authSource=admin&appName=budgetApp`
    })
  })
);

app.use('/home', authRoutes);
app.use('/user', authMiddleware, userRoutes);
app.use('/currency', authMiddleware, currencyRoutes);
app.use('/category', authMiddleware, categoryRoutes);
app.use('/transaction', authMiddleware, transactionRoutes);

// Custom error handling middleware. It handles random errors and checks its type and format and returns it
app.use((err: BaseError | Error, req: Request, res: Response, next: NextFunction) => {
  console.error(err.stack);
  if (err instanceof BaseError) {
    res.status(err.status).json({ message: err.message });
  } else {
    res.status(500).json({ message: 'Internal Server Error' });
  }
});
/**
 * This function connects to the MongoDB cluster using connectToCluster method in cluster.ts
 */
async function startServer() {
  try {
    await connectToCluster();
    app.listen(port, () => {
      console.log(`Server is running at http://localhost:${port}`);
    });
  } catch (error) {
    console.log('Failed to connect to cluster: ' + error);
  }
}

startServer();

export default app;