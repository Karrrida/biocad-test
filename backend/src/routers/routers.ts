import { Router } from 'express';
import AuthController from '../controllers/AuthController';
import ItemsController from '../controllers/ItemsController';
import checkAuthMiddleware from '../middlewares/checkAuth.middleware';
import checkPermissionMiddleware from '../middlewares/checkPermission.middleware';

const router = Router();

router.post('/auth/register', AuthController.register);
router.post('/auth/login', AuthController.login);

router.get('/items', checkAuthMiddleware, ItemsController.getItems);

router.post('/items', checkAuthMiddleware, ItemsController.create);
router.patch('/items/:id', checkAuthMiddleware, checkPermissionMiddleware, ItemsController.update);
router.delete('/items/:id', checkAuthMiddleware, checkPermissionMiddleware, ItemsController.delete);


export default router;