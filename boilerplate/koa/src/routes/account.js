import Router from "koa-router";
import jwt from "jsonwebtoken";
import models from "../models";
import { USERNAME, PASSWORD, JWT_SECRET } from "../lib/env";
import config from "../config";
const { EXPIRES_IN } = config;

const router = new Router();

router.post("/login", async (ctx, next) => {
  const { userName, password, type } = ctx.request.body;
  if (!type) {
    // ctx.throw(401, '账号类型不能为空！')
    ctx.body = {
      status: "error",
      type,
      currentAuthority: "guest",
      message: "账号类型不能为空！"
    };
  }
  if (USERNAME === userName && PASSWORD === password) {
    const authtoken = jwt.sign(
      {
        userName,
        type
      },
      JWT_SECRET,
      { expiresIn: EXPIRES_IN }
    );
    ctx.body = {
      status: "ok",
      type,
      currentAuthority: "admin",
      authtoken
    };
  } else {
    // ctx.throw(401, '账号或密码错误！')
    ctx.body = {
      status: "error",
      type,
      currentAuthority: "guest",
      message: "账号或密码错误！"
    };
  }
  await next();
});

router.get("/user", async (ctx, next) => {
  ctx.body = {
    name: "Admin",
    avatar:
      "https://gw.alipayobjects.com/zos/rmsportal/BiazfanxmamNRoxxVxka.png",
    id: "00000001",
    email: "test@test.com"
  };
  await next();
});

export default router;
