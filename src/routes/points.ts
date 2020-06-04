import { Router } from 'express';
import PointsController from '../controllers/points';

export const router = Router({ mergeParams: true });

router.get('/points', PointsController.index);
router.get('/points/:id', PointsController.show);
router.post('/points', PointsController.create);

export default router;
