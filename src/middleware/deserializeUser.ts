import { Request, Response, NextFunction } from 'express';
import { get } from 'lodash';
import { verifyJWT } from '../utils/jwt.utils';
import { decode } from 'punycode';
const deserializeUser = (req: Request, res: Response, next: NextFunction) => {
  const accessToken = get(req, 'headers.authorization', '').replace(
    /^Bearer\s/,
    ''
  );
  console.log('accesstoken', accessToken);

  const refreshToken = get(req, 'headers.x-refresh');

  if (!accessToken) return next();

  const { expired, decoded } = verifyJWT(accessToken);

  console.log(decoded);

  if (decoded) {
    res.locals.user = decoded;
    return next();
  }
  return next();
};

export default deserializeUser;
