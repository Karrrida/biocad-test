import express from 'express';
import router from './routers/routers';
import { PORT } from './config';
import { connectDB } from './db';
import setupMiddlewares from './middlewares';
import errorHandler from './middlewares/error.middleware';
import logger from './utils/logger';


const app = express();
const startServer = () => {
  setupMiddlewares(app);
  app.use('/', router);
  app.use(errorHandler);

  app.listen(PORT, (): void => {
    logger.info(`Listening on port ${PORT}`);
  });
};

const initApp = async () => {
  try {
    await connectDB();

    startServer();
  } catch (err) {
    logger.error('Failed to connect to DB', err);
    process.exit(1);
  }
};

initApp();
