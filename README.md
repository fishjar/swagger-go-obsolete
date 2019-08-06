# swagger-go

基于`swagger.yaml`文档的快速开始项目

## 主要功能

- 通过`swagger.yaml`生成`REST API`后端代码
  - `nodejs`：
    - `koajs`
      - 包含 ORM（sequelize）
      - 简易 JWT 验证
    - `eggjs`
  - `java`
    - `spring boot`
  - `python`
    - `flask`
- 通过`swagger.yaml`生成后台管理系统前端代码
  - `Ant Design Pro`

## 使用指引

```sh
# 拉取代码
git clone git@github.com:fishjar/swagger-go.git
# 根据需求编辑swagger文件
vi swagger/swagger.yaml

# 生成koa后端代码
npm run koa
# 运行koa后端服务
cd dist/koa
npm install
npm run dev #开发
npm run build #打包
npm run start #启动，需要配置数据库链接

#生成Ant Design Pro后台系统前端代码
npm run antd
#运行Ant Design Pro
cd dist/antd
cnpm install
npm run start #开发
npm run build #打包

#补全swagger文档
npm run swagger
#运行swagger ui及swagger edit
cd dist/swagger
docker-compose up
```

## 目录结构

```sh
├── bin #生成代码脚本文件
│   ├── antd.js
│   ├── egg.js
│   ├── flask.js
│   ├── koa.js
│   ├── spring.js
│   └── swagger.js
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

## swagger 编辑说明

版本基于 2.0

运行`npm run swagger`会自动补全`definitions`中的`model`到`paths`，
因此`paths`部分仅需编辑额外的接口，

### 扩展字段

| 字段名        | 字段类型 | 说明                        |
| ------------- | -------- | --------------------------- |
| x-isModel     | boolean  | 是否当做 model 处理         |
| x-plural      | string   | model 的复数形式            |
| x-message     | string   | andt 中的提示信息           |
| x-showTable   | boolean  | antd 中是否显示在列表中     |
| x-showFilter  | boolean  | antd 中是否搜索字段         |
| x-showSorter  | boolean  | antd 列表中是否需要排序     |
| x-isRichText  | boolean  | antd 中是否使用富文本编辑器 |
| x-enumMap     | object   | 枚举类型的说明字典          |
| x-description | string   | 枚举类型的说明文字          |
| x-length      | interger | char 或 string 字段长度     |

数据类型参考下面的`数据类型映射关系`表格

## 数据类型映射关系

| Common      | `type`    | `format`       | Mysql       | Sequelize     | SQLAlchemy          |
| ----------- | --------- | -------------- | ----------- | ------------- | ------------------- |
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
| uri         | `string`  | `hostname`     | VARCHAR     | STRING        | VARCHAR             |
| uri         | `string`  | `ipv4`         | VARCHAR     | STRING        | VARCHAR             |
| uri         | `string`  | `ipv6`         | VARCHAR     | STRING        | VARCHAR             |
| byte        | `string`  | `byte`         | VARCHAR     | STRING        | VARCHAR             |
| binary      | `string`  | `binary`       | BLOB        | STRING.BINARY | BINARY              |
| password    | `string`  | `password`     | VARCHAR     | STRING        | -                   |
| uuid        | `string`  | `uuid`         | CHAR(36)    | UUID/UUIDV1   | -                   |
| object/dict | `string`  | `json`         | JSON        | JSON          | JSON                |
| object/dict | `object`  | `object`       | JSON        | JSON          | JSON                |
| array       | `array`   | `array`        | JSON        | JSON          | JSON                |
| boolean     | `boolean` | `boolean`      | TINYINT(1)  | BOOLEAN       | Boolean/BOOLEAN     |
| enum        | \*        | `enum`         | ENUM        | ENUM          | Enum                |
