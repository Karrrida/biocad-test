import { Request, Response, NextFunction } from 'express';
import CustomResponse from '../utils/CustomResponse'

const errorHandler = (err: any, req: Request, res: Response, next: NextFunction) => {
  const statusCode = res.statusCode || 500;
  const message = err.type || 'Internal Server Error';
  CustomResponse.failure(req, res, {name: 'Error', message}, statusCode, err)
};

export default errorHandler;
