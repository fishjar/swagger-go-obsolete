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

  console.log(`移除：./dist/koa`);
  fs.removeSync(rootDir);

  console.log('\n复制模板文件...');
  fs.copySync(path.resolve(__dirname, '../boilerplate/koa'), rootDir, {
    filter: (src, dest) => {
      if (src.endsWith('.log') || src.endsWith('.sqlite')) {
        console.log(`忽略：.${src.split(ROOT_PATH)[1]}`);
        return false;
      }
      console.log(`复制：.${src.split(ROOT_PATH)[1]} -> .${dest.split(ROOT_PATH)[1]}`);
      return true;
    }
  });

  console.log('\n读取swagger文档...');
  const doc = yaml.safeLoad(fs.readFileSync(YAML_FILE, 'utf8'));

  const moduleNames = Object.keys(doc.definitions)
    .filter(item => doc.definitions[item].title); //过滤，必须包含title属性
  moduleNames.forEach(name => {
    const _name = name.toLowerCase();
    const item = doc.definitions[name];

    console.log(`创建：./dist/koa/src/models/${_name}.js`);
    const modelOutFile = path.join(modelsDir, `${_name}.js`);
    const modelFileData = `
      export default (sequelize, DataTypes) => {
        const ${name} = sequelize.define('${_name}', {
          id: {
            type: DataTypes.UUID,
            defaultValue: DataTypes.UUIDV1,
            primaryKey: true
          },
          ${Object.entries(item.properties)
        .filter(([k]) => !['id'].includes(k)) // 排除id字段
        .map(([k, v]) => `${k}: {
              type: DataTypes.${getDataType(v.format)},
              allowNull: ${item.required.includes(k) ? 'false' : 'true'}
            }`)
        .join(',')}
        });
        return ${name};
      };
    `;
    fs.writeFileSync(modelOutFile, prettier.format(modelFileData, {
      semi: false,
      parser: "babylon"
    }), 'utf8');

    console.log(`创建：./dist/koa/src/routes/${_name}.js`);
    const routeOutFile = path.join(routesDir, `${_name}.js`);
    const routeFileData = `
      import Router from 'koa-router';
      import models from '../models';
      
      const router = new Router();
      
      router.get('/', async (ctx, next) => {
        const { offset = 0, limit = 10, orderby, ...where } = ctx.query
        let order = [];
        if (Array.isArray(orderby)) {
          order = [...orderby.map(item => item.split('__'))];
        } else if (orderby) {
          order = [orderby.split('__')];
        }
        ctx.body = await models.${_name}.findAndCountAll({
          where,
          offset,
          limit,
          order,
        });
        await next();
      });
      
      router.get('/:id', async (ctx, next) => {
        ctx.body = await models.${_name}.findById(ctx.params.id);
        await next();
      });
      
      router.post('/', async (ctx, next) => {
        ctx.body = await models.${_name}.create(ctx.request.body);
        await next();
      });
      
      router.patch('/:id', async (ctx, next) => {
        const obj = await models.${_name}.findById(ctx.params.id);
        ctx.body = await obj.update(ctx.request.body);
        await next();
      });
      
      router.delete('/:id', async (ctx, next) => {
        const obj = await models.${_name}.findById(ctx.params.id);
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


