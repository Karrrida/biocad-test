import { Request, Response, NextFunction, RequestHandler } from 'express';
import CustomRequest from '../interfaces/CustomRequest';
import usersService from '../services/UsersService';
import Bcrypt from '../utils/bcrypt';
import { generateToken } from '../utils/jwt';
import logger from '../utils/logger';
import { Prisma } from '@prisma/client';
import sendToken from '../utils/sendToken';

class AuthController {
  register = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { email, password } = req.body;
      await usersService.createUser(email, password);
      res.status(201).json({ data: { message: `User ${email} created!` } });
      logger.info(`User created with email: ${email} `);
    } catch (err) {
      logger.error(err);
      if (err instanceof Prisma.PrismaClientKnownRequestError && err.code === 'P2002') {
        res.status(400);
        next({ message: 'Email already exists' });
      }
      next(err);
    }

  };

  login: RequestHandler = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const user = await usersService.findUserByEmail(req.body.email);
      if (!user) {
        res.status(403);
        throw new Error('Invalid email or password');
      }

      const isPasswordValid = await Bcrypt.comparePassword(req.body.password, user.password);
      if (!isPasswordValid) {
        res.status(403);
        throw new Error('Invalid email or password');
      }
      const JWT_SECRET = process.env.JWT_SECRET;
      const token = generateToken(user.id, user.email, JWT_SECRET);
      sendToken(res, token);
      res.status(200).json({ message: 'Success' });

    } catch (err) {
      logger.error(err);
      next(err);
    }
  };

  authorized = (req: CustomRequest, res: Response, next: NextFunction) => {
     res.status(200).json({user: req.decoded})
  }
}

export default new AuthController();