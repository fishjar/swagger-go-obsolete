const path = require('path');
const PROJ_NAME = process.env.swagger || '';
const YAML_FILE = path.resolve(__dirname, `../swagger/swagger${PROJ_NAME ? '-' + PROJ_NAME : ''}.yaml`);
const ROOT_PATH = path.resolve(__dirname, '../');
const DIST_PATH = path.resolve(__dirname, '../dist');

module.exports = {
  PROJ_NAME,
  YAML_FILE,
  ROOT_PATH,
  DIST_PATH,
}
