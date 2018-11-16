import Router from 'koa-router';
import models from '../models';

const router = new Router();

router.get('/', async (ctx, next) => {
	const { offset = 0, limit = 10, orderby, ...where } = ctx.query
	let order = [];
	if (Array.isArray(orderby)) {
		order = [...orderby.map(item => item.split('__'))];
	} else if (orderby) {
		order = [orderby.split('__')];
	}
	ctx.body = await models.User.findAndCountAll({
		where,
		offset,
		limit,
		order,
	});
	await next();
});

router.get('/:id', async (ctx, next) => {
	ctx.body = await models.User.findById(ctx.params.id);
	await next();
});

router.post('/', async (ctx, next) => {
	ctx.body = await models.User.create(ctx.request.body);
	await next();
});

router.patch('/:id', async (ctx, next) => {
	const obj = await models.User.findById(ctx.params.id);
	ctx.body = await obj.update(ctx.request.body);
	await next();
});

router.delete('/:id', async (ctx, next) => {
	const obj = await models.User.findById(ctx.params.id);
	ctx.body = await obj.destroy();
	await next();
});

export default router;
