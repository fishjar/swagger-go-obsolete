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
| enum        | `string`  | `enum`         | ENUM        | ENUM          | Enum                |
| boolean     | `boolean` | `boolean`         | TINYINT     | BOOLEAN       | Boolean/BOOLEAN     |
| byte        | `string`  | `byte`         | BLOB        | BLOB          | BLOB                |
| binary      | `string`  | `binary`       | -           | STRING.BINARY | BINARY              |
| password    | `string`  | `password`     | -           | -             | -                   |
| object/dict | `object`  | `json`         | JSON        | JSON          | JSON                |
| array       | `array`   | `array`        | JSON        | JSON          | JSON                |
