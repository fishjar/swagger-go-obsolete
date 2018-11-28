# swagger-go

通过`swagger.yaml`文档生成REST API项目代码及简易后台管理系统代码

## 主要功能

- 通过`swagger.yaml`生成`REST API`项目代码
  - 可生成`koajs`、`eggjs`、`spring boot`、`flask`等
- 通过`swagger.yaml`生成简易后台管理系统代码
  - 后台系统基于`Ant Design Pro`
- 包含多语言的`REST API`项目模板（`boilerplate`）
  - 力求开箱即用，但主要考虑微服务需求，功能精简，认证、缓存均不考虑
  - `nodejs`：`koajs`、`eggjs`
  - `java`：`spring boot`
  - `python`： `flask`

## 目录结构

```sh
├── bin #生成代码脚本文件
│   ├── antd.js
│   ├── egg.js
│   ├── flask.js
│   ├── koa.js
│   └── spring.js
├── boilerplate #项目模板
│   ├── antd
│   ├── egg
│   ├── flask
│   ├── koa
│   └── spring
├── config #配置文件
│   └── index.js
├── dist #生成文件所在文件夹
├── lib #工具包
├── LICENSE
├── package.json
├── README.md
└── swagger #文档文件
    └── swagger.yaml
```

## 数据类型映射关系

| Common      | `type`    | `format`       | Mysql       | Sequelize     | SQLAlchemy          |
|-------------|-----------|----------------|-------------|---------------|---------------------|
| integer     | `integer` | `int4`         | TINYINT     | TINYINT       | -                   |
| integer     | `integer` | `int8`         | SMALLINT    | SMALLINT      | SMALLINT            |
| integer     | `integer` | `int16`        | MEDIUMINT   | MEDIUMINT     | -                   |
| integer     | `integer` | `int32`        | INTEGER     | INTEGER       | Integer/INT/INTEGER |
| long        | `integer` | `int64`        | BIGINT      | BIGINT        | BigInteger/BIGINT   |
| float       | `number`  | `float`        | FLOAT       | FLOAT         | Float/FLOAT         |
| double      | `number`  | `double`       | DOUBLE      | DOUBLE        | -                   |
| double      | `number`  | `decimal`      | DECIMAL     | DECIMAL       | DECIMAL/Numeric     |
| string      | `string`  | `char`         | CHAR        | CHAR          | CHAR                |
| string      | `string`  | `string`       | VARCHAR     | STRING        | VARCHAR             |
| string      | `string`  | `text`         | TEXT        | TEXT          | TEXT                |
| date        | `string`  | `date`         | DATE        | DATEONLY      | Date                |
| dateTime    | `string`  | `date-time`    | DATETIME    | DATE          | DateTime/DATETIME   |
| dateTime    | `string`  | `date-time(6)` | DATETIME(6) | DATE(6)       | DateTime/DATETIME   |
| dateTime    | `string`  | `time-stamp`   | TIMESTAMP   | -             | TIMESTAMP           |
| email       | `string`  | `email`        | VARCHAR     | STRING        | VARCHAR             |
| uri         | `string`  | `uri`          | VARCHAR     | STRING        | VARCHAR             |
| byte        | `string`  | `byte`         | BLOB        | BLOB          | BLOB                |
| binary      | `string`  | `binary`       | -           | STRING.BINARY | BINARY              |
| password    | `string`  | `password`     | -           | -             | -                   |
| uuid        | `string`  | `uuid`         | CHAR(36)    | UUID/UUIDV1   | -                   |
| enum        | *`enum`   | *`enum`        | ENUM        | ENUM          | Enum                |
| boolean     | `boolean` | `boolean`      | TINYINT(1)  | BOOLEAN       | Boolean/BOOLEAN     |
| object/dict | `object`  | `json`         | JSON        | JSON          | JSON                |
| array       | `array`   | `array`        | -           | JSON          | JSON                |


## 验证参数

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