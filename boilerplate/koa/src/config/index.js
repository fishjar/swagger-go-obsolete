import path from 'path';
import fse from 'fs-extra';
import { NODE_ENV } from '../lib/env';

const logDir = path.resolve(__dirname, '../log');
fse.ensureDirSync(logDir);

const sqliteDir = path.resolve(__dirname, '../db');
fse.ensureDirSync(sqliteDir);

const defaultConfig = {
  LOG_PATH: logDir
};

const envConfig = {
  development: {
    DATABASE_URL: `sqlite://${path.join(sqliteDir, 'db.development.sqlite')}`,
    DATABASE_OPT: {
      dialect: 'sqlite',
    },
    LOG_LEVEL: 'debug',
  },
  test: {
    DATABASE_URL: `sqlite://:memory:`,
    DATABASE_OPT: {
      dialect: 'sqlite',
    },
    LOG_LEVEL: 'debug',
  },
  production: {
    DATABASE_URL: 'mysql://root:456@192.168.1.151:3306/koa',
    DATABASE_OPT: {
      dialect: 'mysql',
    },
    LOG_LEVEL: 'info',
  }
};

export default { ...defaultConfig, ...envConfig[NODE_ENV] };
