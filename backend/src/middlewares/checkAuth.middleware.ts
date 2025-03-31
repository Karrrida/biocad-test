import jwt from 'jsonwebtoken';
import { NextFunction } from 'express';
import { CustomRequest } from '../types/requests';
import { TypedResponse } from '../types/api-response';

const checkAuthMiddleware = (req: CustomRequest, res: TypedResponse<null>, next: NextFunction): void => {
  res.removeHeader('X-Powered-By');
  let token = req.cookies.token;
  if (!token) {
    res.status(401).json({ status: false, data: null, message: 'No token provided' });
    return;
  }
  const JWT_SECRET = process.env.JWT_SECRET;

  try {
    req.decoded = jwt.verify(token, JWT_SECRET);
    next();
  } catch (err) {
    if (err instanceof jwt.TokenExpiredError) {
      res.status(401).json({ status: false, data: null, message: err.message });
      return;
    }
    res.status(401).json({ status: false, data: null, message: 'Invalid token' });
    return;
  }
};

export default checkAuthMiddleware;

