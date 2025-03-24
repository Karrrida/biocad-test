import { Response, NextFunction } from 'express';
import CustomRequest from '../interfaces/CustomRequest';
import ItemsService from '../services/ItemsService';
import logger from '../utils/logger';


const checkPermissionMiddleware = async (req: CustomRequest, res: Response, next: NextFunction) => {
  try {
    const itemId: number = Number(req.params.id);
    const userId: number = Number(req.decoded.id);
    const item = await ItemsService.findItemById(itemId);

    if (!item) {
      logger.error(`Item with id ${itemId} not found`);
      res.status(404);
      throw new Error('Not found');
    }

    if (userId !== item.authorId) {
      logger.error('Denied by permission');
      res.status(403);
      throw new Error('Update denied, not have permission');
    }
    next();

  } catch (err) {
    next(err);
  }
};

export default checkPermissionMiddleware;