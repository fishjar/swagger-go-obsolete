import jwtKoa from 'koa-jwt';
import { JWT_SECRET } from '../lib/env';

export default () => jwtKoa({ secret: JWT_SECRET }).unless({ path: [/^\/account\/login/] });
