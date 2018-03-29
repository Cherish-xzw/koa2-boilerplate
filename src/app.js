import Koa from "koa";
import path from "path";
import render from "koa-ejs";
import mount from 'koa-mount';
import serve from "koa-static";
import bodyParser from "koa-bodyparser";
import pkg from '../package.json';

import assets from "./middleware/assets";
import state from "./middleware/state";
import page from "./router/page";
import api from "./router/api";

const app = new Koa();

app.use(
  mount(pkg.path , serve(path.resolve(__dirname, "../public/"), {
    maxage: 1000 * 60 * 60 * 24 * 30 // a month
  }))
);
app.use(
  assets({
    publicPath: `${pkg.path === '/'  ? '' : pkg.path }/static/`
    // prepend: '//cdn.upchina.com' // If assets have been uploaded to cdn
  })
);
app.use(state());
app.use(bodyParser());
app.use(mount(pkg.path, api()));
app.use(mount(pkg.path, page()));

render(app, {
  root: path.join(__dirname, "view"),
  layout: "layout/index",
  viewExt: "ejs",
  cache: true
});

// proxy the webpack assets directory to the webpack-dev-server.
// It is only intended for use in development.
if (app.env === "development") {
  const proxy = require("koa-proxies");
  app.use(
    proxy(`${pkg.path === '/'  ? '' : pkg.path }/static`, {
      target: "http://localhost:3808"
    })
  );
}

export default app;
