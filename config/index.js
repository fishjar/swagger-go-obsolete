const path = require('path');
const swagger = process.env.swagger || 'swagger.yaml';
const YAML_FILE = path.resolve(__dirname, `../swagger/${swagger}`);
const ROOT_PATH = path.resolve(__dirname, '../');
const DIST_PATH = path.resolve(__dirname, '../dist');

module.exports = {
  YAML_FILE,
  ROOT_PATH,
  DIST_PATH,
}
