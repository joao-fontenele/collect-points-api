import { Router } from 'express';
import PointsController from '../controllers/points';
import multerMiddleware from '../middlewares/multer';

export const router = Router({ mergeParams: true });

router.get('/points', PointsController.index);
router.get('/points/:id', PointsController.show);
router.post(
  '/points',
  multerMiddleware.single('image'),
  PointsController.create,
);

export default router;
