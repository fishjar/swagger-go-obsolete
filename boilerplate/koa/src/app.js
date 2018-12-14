import Koa from 'koa';
import compress from 'koa-compress'
import bodyParser from 'koa-bodyparser';
import koalogger from 'koa-logger';
import koaqs from 'koa-qs';
import cors from '@koa/cors';

import errorHandler from './middleware/errorHandler';
import reqBodyLog from './middleware/reqBodyLog';
import jwtAuth from './middleware/jwtAuth';
import jwtRolling from './middleware/jwtRolling';

import router from './routes';

const app = new Koa();
koaqs(app);
app
	.use(errorHandler())
	.use(koalogger())
	.use(compress())
	.use(cors())
	.use(bodyParser())
	.use(reqBodyLog())
	.use(jwtAuth())
	.use(jwtRolling())
	.use(router.routes())
	.use(router.allowedMethods());

export default app;
