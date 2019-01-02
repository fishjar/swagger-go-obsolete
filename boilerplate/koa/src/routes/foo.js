import Router from 'koa-router';
import models from '../models';

const router = new Router();

router.get("/", async (ctx, next) => {
  ctx.body = await models.Foo.findOne({ where: ctx.query })
  await next()
})

router.post("/", async (ctx, next) => {
  ctx.body = await models.Foo.findOrCreate({ where: ctx.request.body })
  await next()
})

export default router;
