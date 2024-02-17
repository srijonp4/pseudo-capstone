import { Express, Request, Response } from 'express';
import userRouter from './user.router';
import sessionRouter from './session.router';

function routes(app: Express) {
  app.get('/healthcheck', (req: Request, res: Response) => res.sendStatus(200));
  app.use('/api/users', userRouter);
  app.use('/api/sessions', sessionRouter);
}

export default routes;
