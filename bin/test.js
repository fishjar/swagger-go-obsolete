const path = require('path');

const fs = require('fs-extra')
const yaml = require('js-yaml');
const prettier = require("prettier");

const { ROOT_PATH } = require('../config');
const outFile = path.join(ROOT_PATH, 'bin', 'test.out.js');

// const s = `test${outFile}test`;

const outData = `const s = \`test$\{outFile\}test\`;`;

fs.writeFileSync(outFile, prettier.format(outData, {
  semi: false,
  parser: "babylon"
}), 'utf8');
