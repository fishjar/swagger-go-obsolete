import Router from "koa-router";
import models from "../models";

const router = new Router();

/**
 * 查询多条信息
 */
router.get("/", async (ctx, next) => {
  const { page_num = 1, page_size = 10, sorter, ...where } = ctx.query;
  let order = [];
  if (Array.isArray(sorter)) {
    order = [...sorter.map(item => item.split("__"))];
  } else if (sorter) {
    order = [sorter.split("__")];
  }
  ctx.body = await models.Foo.findAndCountAll({
    where,
    offset: (page_num - 1) * page_size,
    limit: page_size,
    order
  });
  await next();
});

/**
 * 根据ID查询单条信息
 */
router.get("/:id", async (ctx, next) => {
  ctx.body = await models.Foo.findById(ctx.params.id);
  await next();
});

/**
 * 创建单条信息
 */
router.post("/", async (ctx, next) => {
  ctx.body = await models.Foo.create(ctx.request.body);
  await next();
});

/**
 * 创建多条信息
 */
router.post("/multiple", async (ctx, next) => {
  ctx.body = await models.Foo.bulkCreate(ctx.request.body);
  await next();
});

/**
 * 更新多条信息
 */
router.patch("/", async (ctx, next) => {
  ctx.body = await models.Foo.update(ctx.request.body.fields, {
    where: ctx.request.body.filter
  });
  await next();
});

/**
 * 更新单条信息
 */
router.patch("/:id", async (ctx, next) => {
  const obj = await models.Foo.findById(ctx.params.id);
  ctx.body = await obj.update(ctx.request.body);
  await next();
});

/**
 * 删除多条信息
 */
router.delete("/", async (ctx, next) => {
  ctx.body = await models.Foo.destroy({
    where: ctx.request.body
  });
  await next();
});

/**
 * 删除单条信息
 */
router.delete("/:id", async (ctx, next) => {
  const obj = await models.Foo.findById(ctx.params.id);
  ctx.body = await obj.destroy();
  await next();
});

export default router;
