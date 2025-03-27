import jwt from 'jsonwebtoken';
import { Response, NextFunction } from 'express';
import CustomRequest from '../interfaces/CustomRequest';
import CustomResponse from '../utils/CustomResponse';

const checkAuthMiddleware = (req: CustomRequest, res: Response, next: NextFunction): void => {

  let token = req.cookies.token;
  if (!token) {
    return CustomResponse.failure(req, res, { name: 'Unauthorized', message: 'No token provided' }, 401);
  }
  const JWT_SECRET = process.env.JWT_SECRET;

  try {
    const tokenVerified = jwt.verify(token, JWT_SECRET);
    req.decoded = tokenVerified;
    next();
  } catch (err) {
    if (err instanceof jwt.TokenExpiredError) {
      return CustomResponse.failure(req, res, {}, 401, err);
    }
    return CustomResponse.failure(req, res, { name: 'Unauthorized', message: 'Invalid token' }, 401);
  }
};

export default checkAuthMiddleware;

