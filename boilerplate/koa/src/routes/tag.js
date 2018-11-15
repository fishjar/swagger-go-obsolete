import Router from 'koa-router';
import models from '../models';

const router = new Router();

router.get('/', async (ctx, next) => {
	ctx.body = await models.tag.findAll();
	await next();
});

router.get('/:id', async (ctx, next) => {
	ctx.body = await models.tag.findById(ctx.params.id);	
	await next();
});

router.post('/', async (ctx, next) => {
	ctx.body = await models.tag.create(ctx.request.body);
	await next();
});

router.patch('/:id', async (ctx, next) => {
	const obj = await models.tag.findById(ctx.params.id);
	ctx.body = await obj.update(ctx.request.body);
	await next();
});

router.delete('/:id', async (ctx, next) => {
	const obj = await models.tag.findById(ctx.params.id);
	ctx.body = await obj.destroy();
	await next();
});

export default router;
