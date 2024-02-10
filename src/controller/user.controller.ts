import { Request, Response } from 'express';
import logger from '../utils/logger';
import { createUser } from '../services/user.service';
import { CreateUserInput } from 'schema/user.schema';
export async function createUserHandler(
  req: Request<{}, {}, CreateUserInput['body']>,
  res: Response
) {
  try {
    const user = await createUser(req.body);
    return res.send(user);
  } catch (e) {
    logger.error(e);
    if (e instanceof Error) {
      return res.status(409).send(e.message); //409 Conflict => This response is sent when a request conflicts with the current state of the server.
    } else {
      res.status(500).json({ error: 'Internal Server Error' });
    }
  }
}
