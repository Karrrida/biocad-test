import { Request } from 'express';

interface CustomRequest<T = any> extends Request {
  decoded?: T;
}

export default CustomRequest;