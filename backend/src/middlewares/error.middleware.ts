import { NextFunction, Request, Response } from 'express';
import logger from '../utils/logger';
import { TypedResponse } from '../types/api-response';

const errorHandler = (err: any, req: Request, res: Response, next: NextFunction) => {
  const statusCode = 500;
  const message = 'Internal Server Error';
  logger.error({ err }, `[ERROR] ${err}]`);
  res.status(statusCode).json({ status: false, data: null, message });
};

export default errorHandler;
