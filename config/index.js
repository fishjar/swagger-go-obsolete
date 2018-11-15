const path = require('path');
const YAML_FILE = path.resolve(__dirname, '../swagger/swagger.yaml');
const DIST_PATH = path.resolve(__dirname, '../dist');

module.exports = {
  YAML_FILE,
  DIST_PATH,
}
