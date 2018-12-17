# swagger-go

基于`swagger.yaml`文档的快速开始项目

## 主要功能

- 通过`swagger.yaml`生成`REST API`后端代码
  - `nodejs`：
    - `koajs`
      - 包含ORM（sequelize）
      - 简易JWT验证
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
npm run start #启动

#生成Ant Design Pro后台系统前端代码
npm run antd
#运行Ant Design Pro
cd dist/antd
cnpm install
npm run start #开发
npm run build #打包

#补全swagger文档
npm run swagger
#运行swagger ui
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

## swagger 编辑说明

版本基于2.0

运行`npm run swagger`会自动补全`definitions`中的`model`到`paths`，
因此`paths`部分仅需编辑额外的接口，

数据类型参考下面的`数据类型映射关系`表格

### 扩展字段

| 字段名           | 字段类型    | 说明              |
|---------------|---------|-----------------|
| x-isModel     | boolean | 是否当做model处理     |
| x-plural      | string  | model的复数形式      |
| x-message     | string  | andt中的提示信息      |
| x-showTable   | boolean | antd中是否显示在列表中   |
| x-showFilter  | boolean | antd中是否搜索字段     |
| x-showSorter  | boolean | antd列表中是否需要排序   |
| x-isRichText  | boolean | antd中是否使用富文本编辑器 |
| x-enumMap     | object  | 枚举类型的说明字典       |
| x-description | string  | 枚举类型的说明文字       |

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