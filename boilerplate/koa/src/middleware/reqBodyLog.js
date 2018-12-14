import logger from '../lib/logger';

export default () => async function reqBodyLog(ctx, next) {
  logger.info(`req body ${JSON.stringify(ctx.request.body)}`);
  await next();
}
