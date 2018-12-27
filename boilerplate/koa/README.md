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
    ├── middleware #中间件
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
  "jsonwebtoken": "^8.4.0", // JWT 认证插件
  "koa": "^2.6.1", // 核心包
  "koa-body": "^4.2.1", // body解析
  "koa-compress": "^3.0.0", // gzip压缩
  "koa-jwt": "^3.5.1", // JWT 验证
  "koa-logger": "^3.2.0", // 日志中间件
  "koa-qs": "^2.0.0", // querystring处理
  "koa-router": "^7.4.0", // 路由插件
  "mysql2": "^1.6.4", // mysql支持
  "request": "^2.88.0", // http请求插件
  "request-promise": "^4.2.2",
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

## 验证参数参考

```js
const ValidateMe = sequelize.define('foo', {
  foo: {
    type: Sequelize.STRING,
    validate: {
      is: ["^[a-z]+$",'i'],     // 只允许字母
      is: /^[a-z]+$/i,          // 与上一个示例相同,使用了真正的正则表达式
      not: ["[a-z]",'i'],       // 不允许字母
      isEmail: true,            // 检查邮件格式 (foo@bar.com)
      isUrl: true,              // 检查连接格式 (http://foo.com)
      isIP: true,               // 检查 IPv4 (129.89.23.1) 或 IPv6 格式
      isIPv4: true,             // 检查 IPv4 (129.89.23.1) 格式
      isIPv6: true,             // 检查 IPv6 格式
      isAlpha: true,            // 只允许字母
      isAlphanumeric: true,     // 只允许使用字母数字
      isNumeric: true,          // 只允许数字
      isInt: true,              // 检查是否为有效整数
      isFloat: true,            // 检查是否为有效浮点数
      isDecimal: true,          // 检查是否为任意数字
      isLowercase: true,        // 检查是否为小写
      isUppercase: true,        // 检查是否为大写
      notNull: true,            // 不允许为空
      isNull: true,             // 只允许为空
      notEmpty: true,           // 不允许空字符串
      equals: 'specific value', // 只允许一个特定值
      contains: 'foo',          // 检查是否包含特定的子字符串
      notIn: [['foo', 'bar']],  // 检查是否值不是其中之一
      isIn: [['foo', 'bar']],   // 检查是否值是其中之一
      notContains: 'bar',       // 不允许包含特定的子字符串
      len: [2,10],              // 只允许长度在2到10之间的值
      isUUID: 4,                // 只允许uuids
      isDate: true,             // 只允许日期字符串
      isAfter: "2011-11-05",    // 只允许在特定日期之后的日期字符串
      isBefore: "2011-11-05",   // 只允许在特定日期之前的日期字符串
      max: 23,                  // 只允许值 <= 23
      min: 23,                  // 只允许值 >= 23
      isCreditCard: true,       // 检查有效的信用卡号码

      // 也可以自定义验证:
      isEven(value) {
        if (parseInt(value) % 2 != 0) {
          throw new Error('Only even values are allowed!')
          // 我们也在模型的上下文中，所以如果它存在的话, 
          // this.otherField会得到otherField的值。
        }
      }
    }
  }
});
```
