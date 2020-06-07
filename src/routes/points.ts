import { Router } from 'express';
import PointsController from '../controllers/points';
import multerMiddleware from '../middlewares/multer';
import { Joi, celebrate, Segments } from 'celebrate';

export const router = Router({ mergeParams: true });

router.get('/points', PointsController.index);
router.get('/points/:id', PointsController.show);
router.post(
  '/points',
  multerMiddleware.single('image'),
  celebrate({
    [Segments.BODY]: {
      name: Joi.string().required(),
      email: Joi.string().email().required(),
      whatsapp: Joi.string().required(),
      city: Joi.string().required(),
      uf: Joi.string().required(),
      lat: Joi.number().required(),
      lon: Joi.number().required(),
      items: Joi.string().required(),
    },
  }),
  PointsController.create,
);

export default router;
