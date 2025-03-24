import express, { Express } from 'express';
import cors from 'cors';
import cookieParser from 'cookie-parser';

const setupMiddlewares = (app: Express): void => {
  app.use(express.json());
  app.use(express.urlencoded({ extended: true }));
  app.use(cookieParser());
  app.use(cors({
    origin: 'http://localhost:5173',
    credentials: true

  }));
};

export default setupMiddlewares;