import Router from 'koa-router';
import models from '../models';

const router = new Router();

router.get("/", async (ctx, next) => {
  ctx.body = await models.Foo.findOne({ where: ctx.query })
  await next()
})

router.post("/", async (ctx, next) => {
  const [foo, is_new_record] = await models.Foo.findOrCreate({ where: ctx.request.body })
  ctx.body = {
    // ...data.toJSON(),
    ...foo.get({ plain: true }),
    is_new_record,
  };
  await next()
})

export default router;
