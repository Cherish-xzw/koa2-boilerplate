const webpackDevMiddleware = require('webpack-dev-middleware');

module.exports = function(compiler, opts) {
  const middleware = webpackDevMiddleware(compiler, opts);
  const koaDevMiddleware = async (ctx, next) => {
    await middleware(
      ctx.req,
      {
        end: content => {
          ctx.body = content;
        },
        setHeader: (name, value) => {
          ctx.set(name, value);
        },
      },
      next
    );
  };

  return koaDevMiddleware;
};
