import Router from 'koa-router';
import home from '../controller/home';
import about from '../controller/about';

const appRoutes = () => {
  const router = new Router();

  router.get('/', home);
  router.get('/about', about);

  return router.routes();
};

export default appRoutes;
