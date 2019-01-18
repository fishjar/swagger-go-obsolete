const path = require('path');

const fs = require('fs-extra')
const yaml = require('js-yaml');
const prettier = require("prettier");

const { PROJ_NAME, YAML_FILE, ROOT_PATH, DIST_PATH } = require('../config');
const { getDataType } = require('../lib');

const PROJ_FULL_NAME = PROJ_NAME ? 'koa-' + PROJ_NAME : 'koa';

try {
  console.log('---开始执行脚本---\n');
  if(!fs.existsSync(YAML_FILE)) {
    throw new Error("swagger文件不存在!");
  }
  // 定义目录结构
  const rootDir = path.join(DIST_PATH, PROJ_FULL_NAME);
  const configDir = path.join(rootDir, 'src', 'config');
  const libDir = path.join(rootDir, 'src', 'lib');
  const modelsDir = path.join(rootDir, 'src', 'models');
  const routesDir = path.join(rootDir, 'src', 'routes');

  console.log(`移除：${rootDir}`);
  fs.removeSync(rootDir);

  console.log('\n复制模板文件...');
  fs.copySync(path.resolve(__dirname, '../boilerplate/koa'), rootDir, {
    filter: (src, dest) => {
      if (src.indexOf('node_modules') !== -1) {
        return false;
      }
      if (src.endsWith('.log') || src.endsWith('.sqlite')) {
        console.log(`忽略：.${src.split(ROOT_PATH)[1]}`);
        return false;
      }
      console.log(`复制：.${src.split(ROOT_PATH)[1]} -> <DIST_PATH>${dest.split(DIST_PATH)[1]}`);
      return true;
    }
  });

  console.log('\n读取swagger文档...');
  const doc = yaml.safeLoad(fs.readFileSync(YAML_FILE, 'utf8'));
  // console.log(doc.definitions)

  const moduleNames = Object.keys(doc.definitions)
    .filter(item => doc.definitions[item]['x-isModel']); //过滤，必须包含`x-isModel`属性
  moduleNames.forEach(name => {
    const item = doc.definitions[name];
    const _name = name.toLowerCase();
    const pluralName = item['x-plural'].toLowerCase();
    const tableName = item['x-tableName'] || _name;

    const modelOutFile = path.join(modelsDir, `${name}.js`);
    console.log(`创建：<DIST_PATH>${modelOutFile.split(DIST_PATH)[1]}`);
    const modelFileData = `
      export default (sequelize, DataTypes) => {
        const ${name} = sequelize.define('${name}', {
          id: {
            type: DataTypes.UUID,
            defaultValue: DataTypes.UUIDV1,
            primaryKey: true
          },
          ${Object.entries(item.properties)
            .filter(([k]) => !['id'].includes(k)) // 排除id字段
            .map(([k, v]) => `${k}: {
              type: DataTypes.${getDataType(v.format)},
              allowNull: ${item.required.includes(k) ? 'false' : 'true'},
              unique: ${v.uniqueItems?'true':'false'},
              ${v.default===undefined?'':`defaultValue: ${v.default},`}validate: {
              ${v.enum===undefined?'':`isIn: [${JSON.stringify(v.enum)}],`}
              ${v.minimum===undefined?'':`min: ${v.minimum},`}
              ${v.maximum===undefined?'':`max: ${v.maximum},`}
              ${(v.minLength!==undefined&&v.maxLength!==undefined)?`len: [${v.minLength},${v.maxLength}],`:''}
              ${v.format==='email'?`isEmail: true,`:''}
              ${v.format==='uri'?`isUrl: true,`:''}
              }
            }`)
          .join(',')}
        }, {
          underscored: true, // 下划线字段
          paranoid: true, // 软删除
          freezeTableName: true, // 禁用修改表名
          tableName: '${tableName}', // 定义表的名称
        });
        return ${name};
      };
    `;
    fs.writeFileSync(modelOutFile, prettier.format(modelFileData, {
      semi: true,
      trailingComma: "es5",
      parser: "babylon"
    }), 'utf8');

    const routeOutFile = path.join(routesDir, `${pluralName}.js`);
    console.log(`创建：<DIST_PATH>${routeOutFile.split(DIST_PATH)[1]}`);
    const routeFileData = `
      import Router from 'koa-router';
      import models from '../models';
      
      const router = new Router();
      
      router.get('/', async (ctx, next) => {
        const { page_num = 1, page_size = 10, sorter, ...where } = ctx.query
        let order = [];
        if (Array.isArray(sorter)) {
          order = [...sorter.map(item => item.split('__'))];
        } else if (sorter) {
          order = [sorter.split('__')];
        }
        ctx.body = await models.${name}.findAndCountAll({
          where,
          offset: (page_num - 1) * page_size,
          limit: page_size,
          order,
        });
        await next();
      });
      
      router.get('/:id', async (ctx, next) => {
        ctx.body = await models.${name}.findById(ctx.params.id);
        await next();
      });
      
      router.post('/', async (ctx, next) => {
        ctx.body = await models.${name}.create(ctx.request.body);
        await next();
      });

      router.post('/multiple', async (ctx, next) => {
        ctx.body = await models.${name}.bulkCreate(ctx.request.body);
        await next();
      });

      router.patch('/', async (ctx, next) => {
        ctx.body = await models.${name}.update(ctx.request.body.fields, {
          where: ctx.request.body.filter
        });
        await next();
      });

      router.patch('/:id', async (ctx, next) => {
        const obj = await models.${name}.findById(ctx.params.id);
        ctx.body = await obj.update(ctx.request.body);
        await next();
      });

      router.delete('/', async (ctx, next) => {
        ctx.body = await models.${name}.destroy({
          where: ctx.request.body,
        });
        await next();
      });
      
      router.delete('/:id', async (ctx, next) => {
        const obj = await models.${name}.findById(ctx.params.id);
        ctx.body = await obj.destroy();
        await next();
      });
      
      export default router;    
    `;
    fs.writeFileSync(routeOutFile, prettier.format(routeFileData, {
      semi: true,
      trailingComma: "es5",
      parser: "babylon"
    }), 'utf8');

    const routeSingleFile = path.join(routesDir, `${_name}.js`);
    console.log(`创建：<DIST_PATH>${routeSingleFile.split(DIST_PATH)[1]}`);
    const routeSingleData = `
      import Router from 'koa-router';
      import models from '../models';
      
      const router = new Router();
      
      router.get("/", async (ctx, next) => {
        ctx.body = await models.${name}.findOne({ where: ctx.query })
        await next()
      })

      router.post("/", async (ctx, next) => {
        const [${_name}, is_new_record] = await models.${name}.findOrCreate({ where: ctx.request.body })
        ctx.body = {
          // ...${_name}.toJSON(),
          ...${_name}.get({ plain: true }),
          is_new_record,
        };
        await next()
      })
      
      export default router;
    `;
    fs.writeFileSync(routeSingleFile, prettier.format(routeSingleData, {
      semi: true,
      trailingComma: "es5",
      parser: "babylon"
    }), 'utf8');

  })

  console.log('\n---全部执行完成---');
} catch (err) {
  console.log(err)
  console.log('非正常退出!!')
}


