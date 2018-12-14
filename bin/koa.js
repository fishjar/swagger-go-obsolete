const path = require('path');

const fs = require('fs-extra')
const yaml = require('js-yaml');
const prettier = require("prettier");

const { YAML_FILE, ROOT_PATH, DIST_PATH } = require('../config');
const { getDataType } = require('../lib');

try {
  console.log('---开始执行脚本---\n');
  // 定义目录结构
  const rootDir = path.join(DIST_PATH, 'koa');
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
    // const _name = name.toLowerCase();
    const pluralName = item['x-plural'].toLowerCase();

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
              ${v.enum===undefined?'':`isIn: [[${v.enum}]],`}
              ${v.minimum===undefined?'':`min: ${v.minimum},`}
              ${v.maximum===undefined?'':`max: ${v.maximum},`}
              ${(v.minLength!==undefined&&v.maxLength!==undefined)?`len: [${v.minLength},${v.maxLength}],`:''}
              ${v.format==='email'?`isEmail: true,`:''}
              ${v.format==='uri'?`isUrl: true,`:''}
              }
            }`)
          .join(',')}
        }, {
          tableName: '${name}',
          paranoid: true,
        });
        return ${name};
      };
    `;
    fs.writeFileSync(modelOutFile, prettier.format(modelFileData, {
      semi: false,
      parser: "babylon"
    }), 'utf8');

    const routeOutFile = path.join(routesDir, `${pluralName}.js`);
    console.log(`创建：<DIST_PATH>${routeOutFile.split(DIST_PATH)[1]}`);
    const routeFileData = `
      import Router from 'koa-router';
      import models from '../models';
      
      const router = new Router();
      
      router.get('/', async (ctx, next) => {
        const { pageNum = 1, pageSize = 10, sorter, ...where } = ctx.query
        let order = [];
        if (Array.isArray(sorter)) {
          order = [...sorter.map(item => item.split('__'))];
        } else if (sorter) {
          order = [sorter.split('__')];
        }
        ctx.body = await models.${name}.findAndCountAll({
          where,
          offset: (pageNum - 1) * pageSize,
          limit: pageSize,
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
        ctx.body = await models.Foo.bulkCreate(ctx.request.body);
        await next();
      });

      router.patch('/', async (ctx, next) => {
        ctx.body = await models.User.update(ctx.request.body.fields, {
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
      semi: false,
      parser: "babylon"
    }), 'utf8');

  })

  console.log('\n---全部执行完成---');
} catch (err) {
  console.log(err)
  console.log('非正常退出!!')
}


