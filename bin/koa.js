const path = require('path');

const fs = require('fs-extra')
const yaml = require('js-yaml');
const prettier = require("prettier");

const { YAML_FILE, DIST_PATH } = require('../config');
const { getDataType } = require('../lib');

try {
  console.log('---开始执行脚本---\n');
  // 定义目录结构
  const rootDir = path.join(DIST_PATH, 'koa');
  const configDir = path.join(rootDir, 'config');
  const libDir = path.join(rootDir, 'lib');
  const modelsDir = path.join(rootDir, 'models');
  const routesDir = path.join(rootDir, 'routes');

  console.log('移除主文件夹...');
  fs.removeSync(rootDir);

  console.log('创建目录结构...');
  fs.ensureDirSync(rootDir);
  fs.ensureDirSync(configDir);
  fs.ensureDirSync(libDir);
  fs.ensureDirSync(modelsDir);
  fs.ensureDirSync(routesDir);

  console.log('读取swagger文档...');
  const doc = yaml.safeLoad(fs.readFileSync(YAML_FILE, 'utf8'));

  const moduleNames = Object.keys(doc.definitions)
    .filter(item => doc.definitions[item].title); //过滤，必须包含title属性
  moduleNames.forEach(name => {
    const _name = name.toLowerCase();
    const item = doc.definitions[name];
    const fileData = `'use strict';
    module.exports = (sequelize, DataTypes) => {
      const ${name} = sequelize.define('${_name}', {
        ${Object.entries(item.properties)
        .filter(([k]) => !['id'].includes(k)) // 排除id字段
        .map(([k, v]) => `${k}: DataTypes.${getDataType(v.format)}`)
        .join(',')}
      });
      return ${name};
    };`;

    const outFile = path.join(routesDir, `${_name}.js`);
    fs.writeFileSync(outFile, prettier.format(fileData, {
      semi: false,
      parser: "babylon"
    }), 'utf8');
  })

  console.log('\n---全部执行完成---');
} catch (err) {
  console.log(err)
  console.log('非正常退出!!')
}


