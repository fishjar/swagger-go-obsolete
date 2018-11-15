import Koa from 'koa';
import compress from 'koa-compress'
import bodyParser from 'koa-bodyparser';
import koalogger from 'koa-logger';
import koaqs from 'koa-qs';
import cors from '@koa/cors';
import stripAnsi from 'strip-ansi';

import router from './routes';
import errorHandler from './lib/errorHandler';
import logger from './lib/logger';

const app = new Koa();
koaqs(app);
app
	.use(errorHandler())
	.use(koalogger())
	.use(compress())
	.use(cors())
	.use(bodyParser())
	.use(async function reqBodyLog (ctx, next) {
		logger.info(`req body ${JSON.stringify(ctx.request.body)}`);
		await next();
	})
	.use(router.routes())
	.use(router.allowedMethods());

export default app;
