import { Request, Response, NextFunction, RequestHandler } from 'express';
import CustomRequest from '../interfaces/CustomRequest';
import CustomResponse from '../utils/CustomResponse';
import usersService from '../services/UsersService';
import Bcrypt from '../utils/bcrypt';
import { generateToken } from '../utils/jwt';
import { Prisma } from '@prisma/client';
import sendToken from '../utils/sendToken';

class AuthController {
  register = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { email, password } = req.body;
      await usersService.createUser(email, password);
      CustomResponse.success(req, res, {message: 'Success'}, 201)
    } catch (err) {
      if (err instanceof Prisma.PrismaClientKnownRequestError && err.code === 'P2002') {
        return CustomResponse.failure(req, res, {message: 'Email already exists'}, 400)
      }
      next(err);
    }

  };

  login: RequestHandler = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const user = await usersService.findUserByEmail(req.body.email);
      if (!user) {
        return CustomResponse.failure(req, res, {message: 'Invalid email or password'}, 403)
      }

      const isPasswordValid = await Bcrypt.comparePassword(req.body.password, user.password);
      if (!isPasswordValid) {
        return CustomResponse.failure(req, res, {message: 'Invalid email or password'}, 403)
      }
      const JWT_SECRET = process.env.JWT_SECRET;
      const token = generateToken(user.id, user.email, JWT_SECRET);
      sendToken(res, token);
      return CustomResponse.success(req, res, {message: 'Success'}, 200)

    } catch (err) {
      next(err);
    }
  };

  authorized = (req: CustomRequest, res: Response, next: NextFunction) => {
    return CustomResponse.success(req, res, {message: 'Success'}, 200)
  }
}

export default new AuthController();