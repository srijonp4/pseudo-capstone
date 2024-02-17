import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
dotenv.config();
const privateKey = process.env.PRIVATE_KEY ?? '';
const publicKey = process.env.PUBLIC_KEY ?? '';
export  function signJWT(
  object: Object,
  options?: jwt.SignOptions | undefined
) {
  return jwt.sign(object, privateKey, {
    ...(options && options),
    algorithm: 'RS384',
  });
}

export function verifyJWT(token: string) {
  try {
    const decoded = jwt.verify(token, publicKey);
    return {
      valid: true,
      expired: false,
      decoded,
    };
  } catch (e: any) {
    console.error(e);
    return {
      valid: false,
      expired: e.message === 'jwt expired',
      decoded: null,
    };
  }
}
