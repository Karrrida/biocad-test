import { Response, NextFunction } from 'express';
import { CustomRequest } from '../types/requests';
import ItemsService from '../services/ItemsService';


const checkPermissionMiddleware = async (req: CustomRequest, res: Response, next: NextFunction) => {
  try {
    const itemId: number = Number(req.params.id);
    const userId: number = Number(req.decoded.id);
    const item = await ItemsService.findItemById(itemId);

    if (!item) {
      res.status(404).json({ status: false, data: null, message: 'Not found' });
      return;
    }

    if (userId !== item.authorId) {
      res.status(403).json({ status: false, data: null, message: 'Permission denied' });
      return;
    }
    next();

  } catch (err) {
    next(err);
  }
};

export default checkPermissionMiddleware;