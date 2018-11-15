const ormTypes = ['Sequelize', 'SQLAlchemy'];
const dataTypes = {
  'int4': ['TINYINT', ''],
  'int8': ['SMALLINT', 'SMALLINT'],
  'int16': ['MEDIUMINT', 'INTEGER'],
  'int32': ['INTEGER', 'INTEGER'],
  'int64': ['BIGINT', 'BIGINT'],
  'float': ['FLOAT', 'FLOAT'],
  'double': ['DOUBLE', 'FLOAT'],
  'decimal': ['DECIMAL', 'DECIMAL'],
  'char': ['CHAR', 'CHAR'],
  'string': ['STRING', 'VARCHAR'],
  'text': ['TEXT', 'TEXT'],
  'date': ['DATEONLY', 'DATE'],
  'date-time': ['DATE(6)', 'DATETIME'],
  'time-stamp': ['INTEGER', 'TIMESTAMP'],
  'enum': ['ENUM', 'ENUM'],
  'boolean': ['BOOLEAN', 'BOOLEAN'],
  'byte': ['BLOB', 'BLOB'],
  'binary': ['STRING.BINARY', 'binary'],
  'json': ['JSON', 'JSON'],
  'array': ['JSON', 'JSON'],
};

const getDataType = (dataType, ormType = 'Sequelize') => {
  const ormIndex = ormTypes.indexOf(ormType);
  const [k, n] = dataType.split(/\(|\)/);
  if (!k || !dataTypes[k] || ormIndex === -1) {
    throw (new Error(`数据类型定义有误:[${dataType}][${ormType}]`))
  }
  let str = dataTypes[k][ormIndex];
  if (n) {
    str += `(${n})`;
  }
  return str;
}

module.exports = {
  getDataType,
}
