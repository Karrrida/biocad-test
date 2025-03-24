import jwt from 'jsonwebtoken';
import { Response, NextFunction } from 'express';
import CustomRequest from '../interfaces/CustomRequest';
import logger from '../utils/logger';

const checkAuthMiddleware = (req: CustomRequest, res: Response, next: NextFunction): void => {
  try {
    let token = req.cookies.token;
    if (!token) {
      logger.error('Out of token');
      res.status(401);
      throw new Error('Unauthorized');
    }
    token = token.replace('Bearer ', '');
    const JWT_SECRET = process.env.JWT_SECRET;
    const tokenVerified = jwt.verify(token, JWT_SECRET);
    if (!tokenVerified) {
      logger.error('Token not verified');
      res.status(401);
      throw new Error('Unauthorized');

    }
    req.decoded = tokenVerified;
    next();
  } catch (err) {
    logger.error(err);
    next(err);
  }

};

export default checkAuthMiddleware;

