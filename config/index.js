const path = require('path');
const YAML_FILE = path.resolve(__dirname, '../swagger/swagger.yaml');
const ROOT_PATH = path.resolve(__dirname, '../');
const DIST_PATH = path.resolve(__dirname, '../dist');

module.exports = {
  YAML_FILE,
  ROOT_PATH,
  DIST_PATH,
}
