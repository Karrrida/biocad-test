import { Response, NextFunction } from 'express';
import CustomRequest from '../interfaces/CustomRequest';
import CustomResponse from '../utils/CustomResponse';
import ItemsService from '../services/ItemsService';


const checkPermissionMiddleware = async (req: CustomRequest, res: Response, next: NextFunction) => {
  try {
    const itemId: number = Number(req.params.id);
    const userId: number = Number(req.decoded.id);
    const item = await ItemsService.findItemById(itemId);

    if (!item) {
      return CustomResponse.failure(req, res, {name: 'Not found', message: `Item with id ${itemId} not found`}, 404);
    }

    if (userId !== item.authorId) {
      return CustomResponse.failure(req, res, {name: 'Not access', message: `Permission denied`}, 403);
    }
    next();

  } catch (err) {
    next(err);
  }
};

export default checkPermissionMiddleware;