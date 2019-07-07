import Router from "koa-router";
import { fetchFeeds } from "../lib/api";
import utils from "../lib/utils";

const router = new Router();

router.get("/", async (ctx, next) => {
  const foo = utils.foo();
  const res = await fetchFeeds({
    foo
  });
  // if (!res) {
  // 	ctx.throw('获取feeds失败')
  // }
  ctx.assert(res, 500, "获取feeds失败", {
    errors: [
      {
        errcode: 0,
        errmsg: "请求第三方接口失败"
      }
    ]
  });
  ctx.body = res;
  await next();
});

export default router;
