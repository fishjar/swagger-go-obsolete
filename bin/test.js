const path = require('path');

const fs = require('fs-extra')
const yaml = require('js-yaml');
const prettier = require("prettier");

const { YAML_FILE, ROOT_PATH, DIST_PATH } = require('../config');

const doc = yaml.safeLoad(fs.readFileSync(YAML_FILE, 'utf8'));
console.log(doc)

// const outData = `const s = \`test$\{outFile\}test\`;`;
const outFile = path.join(ROOT_PATH, 'bin', 'test.out.yaml');
// const outData = yaml.dump({
//   a: 1,
//   b: 2,
//   c : {
//     d: 3,
//     e: [1,2]
//   }
// }, {
//   'styles': {
//     '!!null': 'canonical' // dump null as ~
//   },
//   'sortKeys': true        // sort object keys
// });

// delete doc.paths;

// const outData = yaml.dump(doc, {
//   'styles': {
//     '!!null': 'canonical' // dump null as ~
//   },
//   'sortKeys': true        // sort object keys
// });

const outData = yaml.dump(doc);

// fs.writeFileSync(outFile, prettier.format(outData, {
//   semi: false,
//   parser: "babylon"
// }), 'utf8');


fs.writeFileSync(outFile, outData, 'utf8');
