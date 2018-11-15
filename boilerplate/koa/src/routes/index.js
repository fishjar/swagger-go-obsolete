import fs from 'fs';
import path from 'path';
import Router from 'koa-router';

const router = new Router();
const basename = path.basename(__filename);

fs
  .readdirSync(__dirname)
  .filter(file => {
    return (file.indexOf('.') !== 0) && (file !== basename) && (file.slice(-3) === '.js');
  })
  .forEach(file => {
    const fileName = file.split('.')[0];
    router.use(`/${fileName}`, require(`./${fileName}`).default.routes());
  });

export default router;
