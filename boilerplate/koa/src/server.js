import app from './app';
import db from './models';

db.sequelize.sync().then(() => {
	app.listen(3000);
});
// 带上force参数会强制删除已存在的表
// db.sequelize.sync({force: true}).then(() => {
// 	app.listen(3000);
// });
