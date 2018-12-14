import jwt from 'jsonwebtoken';
import { JWT_SECRET } from '../lib/env';
import config from '../config';
const {
  EXPIRES_IN,
} = config;

export default () => async function jwtRolling(ctx, next) {
  const token = ctx.header.authorization;
  if (token) {
    const {
      userName,
      type,
    } = jwt.verify(token.split(' ')[1], JWT_SECRET);
    const authtoken = jwt.sign({
      userName,
      type,
    }, JWT_SECRET, { expiresIn: EXPIRES_IN });
    ctx.set('authtoken', authtoken);
  }
  await next();
}
