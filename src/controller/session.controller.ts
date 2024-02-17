import { Request, Response } from 'express';
import logger from '../utils/logger';
import config from 'config';
import { validatePassword } from '../services/user.service';
import { signJWT } from '../utils/jwt.utils';
import { createSession, findSessions } from '../services/session.service';

export async function createUserSessionHandler(req: Request, res: Response) {
  //validate the user password
  const user = await validatePassword(req.body);
  if (!user) {
    return res.status(401).send('Invalid email or password');
  }
  // create a session
  const session = await createSession(
    user._id.toString(),
    req.get('user-agent') || ''
  );
  // create a access token
  const accessToken = signJWT(
    {
      ...user,
      session: session._id,
    },
    { expiresIn: config.get<string>('accessTokenTtl') } // 15 mins
  );
  // create a refresh token
  const refreshToken = signJWT(
    {
      ...user,
      session: session._id,
    },
    { expiresIn: config.get<string>('refreshTokenTtl') } //
  );
  // console.log(accessToken, refreshToken);

  //return access and refresh tokens
  return res.send({
    accessToken: accessToken,
    refreshToken: refreshToken,
  });
}

export async function getUserSessionHandler(req: Request, res: Response) {
  const userId = res.locals.user._id;
  console.log('userID : ', userId);
  const sessions = await findSessions({ user: userId });
  console.log(sessions);

  return res.send(sessions);
}

// export async function deleteSessionHandler(req: Request, res: Response) {
//   const sessio;
// }
