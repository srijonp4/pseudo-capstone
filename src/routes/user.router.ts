import { createUserHandler } from '../controller/user.controller';
import { Request, Response, NextFunction } from 'express';
import validateResource from '../middleware/validateResource';
import { Router } from 'express';
import { createUserSchema } from '../schema/user.schema';
const router = Router();
router.route('/').post(validateResource(createUserSchema), createUserHandler);
router
  .route('/healthcheck')
  .get((req: Request, res: Response) => res.sendStatus(200));

export default router;
