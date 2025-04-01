import { Request, NextFunction } from 'express';
import ItemsService from '../services/ItemsService';
import { Prisma } from '@prisma/client';
import logger from '../utils/logger';
import {
  CreateItemRequest,
  CustomRequest,
  DecodedUser,
  GetItemsQuery,
  UpdateItemRequest,
} from '../types/requests';
import { CreateItemResponse, GetItemResponse, TypedResponse, UpdateItemResponse } from '../types/api-response';

class ItemsController {
  create = async (req: CustomRequest<DecodedUser, CreateItemRequest>, res: TypedResponse<CreateItemResponse>, next: NextFunction) => {
    try {
      const { title } = req.body;
      const userId = req.decoded?.id;

      res.removeHeader('X-Powered-By');

      if (!userId) {
        res.status(401).json({ status: false, data: null, message: 'Unauthorized' });
        logger.error({ status: false, userId }, `[OUT: ${req.originalUrl}] [METHOD: ${req.method}] [Unauthorized]`);
        return;
      }

      if (!title) {
        res.status(400)
          .json({ status: false, data: null, message: 'Field title are required' });
        logger.error({
          status: false,
          title: title,
        }, `[OUT: ${req.originalUrl}] [METHOD: ${req.method}] [Not enough data]`);
        return;
      }

      const item = await ItemsService.create(title, userId);
      res.status(200).json({ status: true, data: item, message: 'Success' });
      logger.info({ item }, `[OUT: ${req.originalUrl}] [METHOD: ${req.method} ]]`);
    } catch (err) {
      if (err instanceof Prisma.PrismaClientKnownRequestError) {
        next('Internal Server Error');
      }
      next(err);
    }
  };

  update = async (req: Request<{
    id: string
  }, {}, UpdateItemRequest>, res: TypedResponse<UpdateItemResponse>, next: NextFunction) => {
    try {
      const itemId: number = Number(req.params.id);
      const { title } = req.body;

      if (!title) {
        res.status(400)
          .json({ status: false, data: null, message: 'Field title are required' });
        logger.error({
          status: false,
          title: title,
        }, `[OUT: ${req.originalUrl}] [METHOD: ${req.method}] [Not enough data]`);
        return;
      }

      const updatedItem = await ItemsService.update(itemId, title);
      res.status(200).json({ status: true, data: updatedItem, message: 'Success' });
      logger.info({ updatedItem }, `[OUT: ${req.originalUrl}] [METHOD: ${req.method} ]]`);
    } catch (err) {
      next(err);
    }
  };

  delete = async (req: Request<{ id: string }>, res: TypedResponse<null>, next: NextFunction) => {
    try {
      const itemId: number = Number(req.params.id);

      if (!itemId) {
        res.status(400).json({ status: false, data: null, message: 'Not enough params' });
        logger.error({
          status: false,
          itemId: itemId,
        }, `[OUT: ${req.originalUrl}] [METHOD: ${req.method}] [Not enough params]`);
        return;
      }
      await ItemsService.delete(itemId);
      res.status(200).json({ status: true, data: null, message: 'Success' });
      logger.info({ itemId: itemId }, `[OUT: ${req.originalUrl}] [METHOD: ${req.method} ]]`);
    } catch (err) {
      next(err);
    }
  };
  getItems = async (req: Request<{}, {}, {}, GetItemsQuery>, res: TypedResponse<GetItemResponse>, next: NextFunction) => {
    try {
      const page: number = Number(req.query.page || 1);
      const perPage: number = Number(req.query.perPage || 1);
      const { items, totalPages }: GetItemResponse = await ItemsService.findItems({ page, perPage });
      res.status(200).json({ status: true, data: { items, totalPages }, message: 'Success' });
      logger.info({ items: items, totalPages: totalPages }, `[OUT: ${req.originalUrl}] [METHOD: ${req.method} ]]`);
    } catch (err) {
      next(err);
    }

  };
}

export default new ItemsController();