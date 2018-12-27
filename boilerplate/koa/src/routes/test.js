import Router from 'koa-router';
import {
	fetchFeeds,
} from '../lib/api';
import utils from '../lib/utils';

const router = new Router();

router.get('/', async (ctx, next) => {
	const foo = utils.foo();
	const res = await fetchFeeds({
		foo,
	});
	if (!res) {
		ctx.throw('获取feeds失败')
	}
	ctx.body = res;
	await next();
});


export default router;
