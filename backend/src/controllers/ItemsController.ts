import { Response, NextFunction } from 'express';
import CustomRequest from '../interfaces/CustomRequest';
import ItemsService from '../services/ItemsService';
import { Prisma } from '@prisma/client';
import logger from '../utils/logger';

class ItemsController {
  create = async (req: CustomRequest, res: Response, next: NextFunction) => {
    try {
      const { description, text } = req.body;
      const userId = req.decoded?.id;

      if (!userId) {
        res.status(401);
        throw new Error('Unauthorized');
      }

      if (!description || !text) {
        res.status(400);
        throw new Error('Description and text are required');
      }

      await ItemsService.create(description, text, userId);
      res.status(200).json({ message: `Item created` });
    } catch (err) {
      logger.error(err);
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
      res.status(201).json({ message: `Item updated` });
    } catch (err) {
      logger.error(err);
      if (err instanceof Prisma.PrismaClientKnownRequestError) {
        next('Internal Server Error');
      }
      next(err);
    }
  };

  delete = async (req: CustomRequest, res: Response, next: NextFunction) => {
    try {
      const itemId = Number(req.params.id);

      if (!itemId) {
        res.status(402);
        throw new Error('Internal server error');
      }
      await ItemsService.delete(itemId);
      res.status(201).json({ message: `Item deleted` });
    } catch (err) {
      logger.error(err);
      if (err instanceof Prisma.PrismaClientKnownRequestError) {
        next('Internal server error');
      }
      next(err);
    }
  };
  getItems = async (req: CustomRequest, res: Response, next: NextFunction) => {
    try {
      const items = await ItemsService.findItems();
      res.status(200).json(items);
    } catch (err) {
      logger.error(err);
      next(err);
    }

  };
}


export default new ItemsController();