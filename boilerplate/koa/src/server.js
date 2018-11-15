import app from './app';
import db from './models';

db.sequelize.sync().then(() => {
	app.listen(3000);
});
// db.sequelize.sync({force: true}).then(() => {
// 	app.listen(3000);
// });
