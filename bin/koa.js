const path = require('path');

const fs = require('fs-extra')
const yaml = require('js-yaml');
const prettier = require("prettier");

const { YAML_FILE, DIST_PATH } = require('../config');

(async () => {
  const outDir = path.join(DIST_PATH, 'koa');
  fs.ensureDirSync(outDir);

  const doc = yaml.safeLoad(fs.readFileSync(YAML_FILE, 'utf8'));
  // console.log(doc)
  const moduleNames = Object.keys(doc.definitions).filter(item => doc.definitions[item].title);

  moduleNames.forEach(name => {
    const _name = name.toLowerCase();
    const item = doc.definitions[name];
    const fileData = `'use strict';

    module.exports = (sequelize, DataTypes) => {
      const ${name} = sequelize.define('${_name}', {
        ${Object.entries(item.properties)
        .filter(([k]) => !['id'].includes(k))
        .map(([k, v]) => `${k}: DataTypes.${v.format}`)
        .join(',')}
      });

      return ${name};
    };`;

    const outFile = path.join(outDir, `${_name}.js`);
    fs.writeFileSync(outFile, prettier.format(fileData, { semi: false, parser: "babylon" }), 'utf8');
  })

})();
