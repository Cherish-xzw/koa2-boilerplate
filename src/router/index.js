import Router from 'koa-router';
import home from '../controller/home';
import about from '../controller/about';

const appRoutes = () => {
  const router = new Router();

  router.get('/', home).get('/about', about);

  return router;
};

export default appRoutes;
