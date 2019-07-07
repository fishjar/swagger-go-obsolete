import Router from "koa-router";
import models from "../models";

const router = new Router();

/**
 * 查询单条信息
 */
router.get("/", async (ctx, next) => {
  ctx.body = await models.Foo.findOne({ where: ctx.query });
  await next();
});

/**
 * 查询或创建单条信息
 */
router.post("/", async (ctx, next) => {
  const [foo, is_new_record] = await models.Foo.findOrCreate({
    where: ctx.request.body
  });
  ctx.body = {
    // ...data.toJSON(),
    ...foo.get({ plain: true }),
    is_new_record
  };
  await next();
});

export default router;
