import Koa from 'koa';
import compress from 'koa-compress'
import bodyParser from 'koa-bodyparser';
import koalogger from 'koa-logger';
import koaqs from 'koa-qs';
import cors from '@koa/cors';
import stripAnsi from 'strip-ansi';
import jwt from 'jsonwebtoken';
import jwtKoa from 'koa-jwt';

import router from './routes';
import errorHandler from './lib/errorHandler';
import logger from './lib/logger';
import { JWT_SECRET } from './lib/env';

const app = new Koa();
koaqs(app);
app
	.use(errorHandler())
	.use(koalogger())
	.use(compress())
	.use(cors())
	.use(bodyParser())
	.use(async function reqBodyLog(ctx, next) {
		logger.info(`req body ${JSON.stringify(ctx.request.body)}`);
		await next();
	})
	.use(jwtKoa({ secret: JWT_SECRET }).unless({ path: [/^\/login\/account/] }))
	.use(async function jwtRolling(ctx, next) {
		const token = ctx.header.authorization;
		const decoded = jwt.verify(token.split(' ')[1], JWT_SECRET);
		console.log('-------')
		console.log(decoded)
		await next();
	})
	.use(router.routes())
	.use(router.allowedMethods());

export default app;
