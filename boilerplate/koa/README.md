# KOA DEMO

## 目录结构

```sh
├── dist #输出目录
├── package.json
├── package-lock.json
├── README.md
└── src #源码目录
    ├── app.js #app文件
    ├── config #配置目录
    ├── db #临时数据目录
    ├── lib #中间件及其他工具包目录
    ├── log #日志目录
    ├── models #数据模型目录
    ├── routes #路由配置目录
    └── server.js #启动文件
```

## 依赖列表

```js
"dependencies": {
  "@koa/cors": "^2.2.2", // 跨域请求配置及处理
  "cross-env": "^5.2.0", // 跨系统的环境设置
  "fs-extra": "^7.0.1", // 更好用的文件模块
  "koa": "^2.6.1", // 核心包
  "koa-bodyparser": "^4.2.1", // body解析
  "koa-compress": "^3.0.0", // gzip压缩
  "koa-logger": "^3.2.0", // 日志中间件
  "koa-qs": "^2.0.0", // querystring处理
  "koa-router": "^7.4.0", // 路由插件
  "mysql2": "^1.6.4", // mysql支持
  "sequelize": "^4.41.1", // ORM插件
  "strip-ansi": "^5.0.0", // 输出纯净日志文本
  "winston": "^3.1.0", // 日志框架
  "winston-daily-rotate-file": "^3.5.1" // 日志按日期分割
},
"devDependencies": {
  "babel-cli": "^6.26.0", // ES6支持
  "babel-plugin-transform-object-rest-spread": "^6.26.0",
  "babel-plugin-transform-runtime": "^6.23.0",
  "babel-preset-env": "^1.7.0",
  "babel-preset-minify": "^0.5.0", // 压缩
  "nodemon": "^1.18.6", // 热重启
  "rimraf": "^2.6.2", // 清空文件夹
  "sqlite3": "^4.0.3" // sqlite支持
},
```

## 操作说明

```js
"scripts": {
  "dev": "cross-env NODE_ENV=development DEBUG=koa* nodemon ./src/server.js", // 开发启动
  "build": "rimraf dist && cross-env NODE_ENV=production babel src -d dist -s", // 清空文件夹+转码+压缩
  "start": "cross-env NODE_ENV=production node ./dist/server.js", // 启动
  "test": "echo \"Error: no test specified\" && exit 1"
},
```
