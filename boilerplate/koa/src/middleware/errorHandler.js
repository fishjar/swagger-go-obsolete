import logger from '../lib/logger';

export default () => async function errorHandler (ctx, next) {
  try {
    logger.info(`--> ${ctx.method} ${ctx.href} from ${ctx.ip} ${JSON.stringify(ctx.headers)}`);
    await next();
    logger.info(`res body ${(typeof ctx.body === 'string') ? ctx.body : JSON.stringify(ctx.body)}`);
  } catch (err) {
    ctx.status = err.statusCode || 500
    ctx.body = err.toJSON ? err.toJSON() : { message: err.message, ...err }
    logger.error(`error info ${JSON.stringify(err)}`);
  }
}
