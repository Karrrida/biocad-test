import { Request, Response, NextFunction, RequestHandler } from 'express';
import usersService from '../services/UsersService';
import Bcrypt from '../utils/bcrypt';
import { generateToken } from '../utils/jwt';
import logger from '../utils/logger';
import { Prisma } from '@prisma/client';

class AuthController {
  register = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { email, password } = req.body;
      await usersService.createUser(email, password);
      res.status(201).json({ message: `User ${email} created!` });
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

      res.status(200).json({ message: 'User logged in successfully!', token });

    } catch (err) {
      logger.error(err);
      next(err);
    }
  };
}

export default new AuthController();