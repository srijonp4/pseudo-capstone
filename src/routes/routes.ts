import { Express, Request, Response } from 'express';
import userRouter from './user.router';
function routes(app: Express) {
  app.get('/healthcheck', (req: Request, res: Response) => res.sendStatus(200));
  app.use('/api/users', userRouter);
}

export default routes;
