import Router from 'koa-router';

const apiRoutes = () => {
  const router = new Router();

  router.prefix('/api');

  router.post('/', async ctx => {
    ctx.body = ctx.request.body;
  });

  return router.routes();
};

export default apiRoutes;
