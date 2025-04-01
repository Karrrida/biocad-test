import express, { Express } from 'express';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import errorHandler from './error.middleware';

const setupMiddlewares = (app: Express): void => {
  app.use(express.json());
  app.use(express.urlencoded({ extended: true }));
  app.use(cookieParser());
  app.use(cors({
    origin: 'http://localhost:8080',
    credentials: true

  }));
  app.use(errorHandler);
};

export default setupMiddlewares;