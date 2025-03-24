import { Request, Response, NextFunction } from 'express';

const errorHandler = (err: any, req: Request, res: Response, next: NextFunction) => {
  const statusCode = res.statusCode || 500;
  const message = err.message || 'Internal Server Error';//
  res.status(statusCode).send(message);
};

export default errorHandler;
