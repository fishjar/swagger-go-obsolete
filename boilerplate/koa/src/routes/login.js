import Router from 'koa-router';
import jwt from 'jsonwebtoken';
import models from '../models';
import {
	USERNAME,
	PASSWORD,
	JWT_SECRET,
} from '../lib/env';

const router = new Router();

router.post('/account', async (ctx, next) => {
	const {
		userName,
		password,
		type,
	} = ctx.request.body;
	if (!type) {
		ctx.throw(401, '账号类型不能为空！')
	}
	if (USERNAME === userName && PASSWORD === password) {
		const authtoken = jwt.sign({
			userName,
			type,
		}, JWT_SECRET, { expiresIn: '1h' });
		ctx.body = {
			status: 'ok',
			type,
			currentAuthority: 'admin',
			authtoken,
		};
	} else {
		ctx.throw(401, '账号或密码错误！')
	}
	await next();
});


export default router;
