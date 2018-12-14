import path from 'path';
import fse from 'fs-extra';

const sqliteDir = path.resolve(__dirname, '../db');
fse.ensureDirSync(sqliteDir);

export default {
  DATABASE_URL: `sqlite://${path.join(sqliteDir, 'db.development.sqlite')}`,
  DATABASE_OPT: {
    dialect: 'sqlite',
  },
  LOG_LEVEL: 'debug',
};
