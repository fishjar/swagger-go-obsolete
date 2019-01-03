import app from './app';
import db from './models';
const port = process.env.NODE_PORT || 3000;

db.sequelize.sync().then(() => {
	app.listen(port);
	console.log(`\n>>> app run at port: ${port} <<<\n`)
});
// 带上force参数会强制删除已存在的表
// db.sequelize.sync({force: true}).then(() => {
// 	app.listen(port);
// });
