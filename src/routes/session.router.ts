import {
  createUserSessionHandler,
  getUserSessionHandler,
} from '../controller/session.controller';
import { createSessionSchema } from '../schema/session.schema';
import { createUserHandler } from '../controller/user.controller';
import { Request, Response, NextFunction } from 'express';
import Router from 'express';
import validateResource from '../middleware/validateResource';
import requireUser from '../middleware/requireUser';

const router = Router();

router
  .route('/')
  .get(requireUser, getUserSessionHandler)
  .post(validateResource(createSessionSchema), createUserSessionHandler);
router
  .route('/healthcheck')
  .get((req: Request, res: Response) => res.sendStatus(200));

export default router;
