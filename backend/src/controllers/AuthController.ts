import { Request, Response, NextFunction } from 'express';
import { CustomRequest } from '../types/requests';
import usersService from '../services/UsersService';
import Bcrypt from '../utils/bcrypt';
import { generateToken } from '../utils/jwt';
import { Prisma } from '@prisma/client';
import sendToken from '../utils/sendToken';
import { TypedResponse } from '../types/api-response';

class AuthController {
  register = async (req: Request, res: TypedResponse<null>, next: NextFunction) => {
    try {
      const { email, password } = req.body;
      await usersService.createUser(email, password);
      res.status(201).json({ status: true, data: null, message: 'Success' });
    } catch (err) {
      if (err instanceof Prisma.PrismaClientKnownRequestError && err.code === 'P2002') {
        res.status(400).json({ status: false, data: null, message: 'Email already exists' });
      } else {
        next(err);
      }
    }

  };

  login = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const user = await usersService.findUserByEmail(req.body.email);
      if (!user) {
        res.status(403).json({ status: false, data: null, message: 'Invalid email or password' });
        return;
      }

      const isPasswordValid = await Bcrypt.comparePassword(req.body.password, user.password);
      if (!isPasswordValid) {
        res.status(403).json({ status: false, data: null, message: 'Invalid email or password' });
        return;
      }
      const JWT_SECRET = process.env.JWT_SECRET;
      const token = generateToken(user.id, user.email, JWT_SECRET);
      sendToken(res, token);
      res.status(200).json({ status: true, data: null, message: 'Success' });
    } catch (err) {
      next(err);
    }
  };

  authorized = (req: CustomRequest, res: Response, next: NextFunction) => {
    if (req.cookies.token) {
      res.status(200).json({ status: true, data: null, message: 'Success' });
    } else {
      res.status(403).json({ status: false, data: null, message: 'Invalid token' });
    }
  };
}

export default new AuthController();