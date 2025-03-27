import { Response, NextFunction } from 'express';
import CustomRequest from '../interfaces/CustomRequest';
import CustomResponse from '../utils/CustomResponse';
import ItemsService from '../services/ItemsService';
import { Prisma } from '@prisma/client';

class ItemsController {
  create = async (req: CustomRequest, res: Response, next: NextFunction) => {
    try {
      const { description, text } = req.body;
      const userId = req.decoded?.id;

      if (!userId) {
        return CustomResponse.failure(req, res, { name: 'Unauthorized' }, 401);
      }

      if (!description || !text) {
        return CustomResponse.failure(req, res, { name: 'Bad data', message: 'Fields description and name are required' }, 401);
      }

      await ItemsService.create(description, text, userId);
      return CustomResponse.success(req, res, {message: 'Success'}, 200);
    } catch (err) {
      if (err instanceof Prisma.PrismaClientKnownRequestError) {
        next('Internal Server Error');
      }
      next(err);
    }
  };

  update = async (req: CustomRequest, res: Response, next: NextFunction) => {
    try {
      const itemId = Number(req.params.id);
      await ItemsService.update(itemId, req.body.text, req.body.description);
      return CustomResponse.success(req, res, {message: 'Success'}, 200);
    } catch (err) {
      next(err);
    }
  };

  delete = async (req: CustomRequest, res: Response, next: NextFunction) => {
    try {
      const itemId = Number(req.params.id);

      if (!itemId) {
        return CustomResponse.failure(req, res, { name: 'Bad data', message: 'not enough params' }, 400);
      }
      await ItemsService.delete(itemId);
      return CustomResponse.success(req, res, {message: 'Success'}, 200);
    } catch (err) {
      next(err);
    }
  };
  getItems = async (req: CustomRequest, res: Response, next: NextFunction) => {
    try {
      const items = await ItemsService.findItems();
      return CustomResponse.success(req, res, {items}, 200);
    } catch (err) {
      next(err);
    }

  };
}


export default new ItemsController();