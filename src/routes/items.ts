import { Router } from 'express';
import ItemsController from '../controllers/items';

export const router = Router({ mergeParams: true });

router.get('/items', ItemsController.index);

export default router;
