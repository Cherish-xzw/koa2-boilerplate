import Koa from "koa";
import path from "path";
import render from "koa-ejs";
import serve from "koa-static";
import bodyParser from "koa-bodyparser";

import assets from "./middleware/assets";
import state from "./middleware/state";
import page from "./router/page";
import api from "./router/api";

const IS_DEV = process.env.NODE_ENV === "development";
const IS_PROD = process.env.NODE_ENV === "production";

const app = new Koa();

app.use(
  serve(path.resolve(__dirname, "../public/"), {
    maxage: 1000 * 60 * 60 * 24 * 30 // a month
  })
);
app.use(
  assets({
    env: process.env.NODE_ENV,
    manifestPath: path.join(__dirname, "../public/static/", "manifest.json"),
    outPath: "/static"
    // If assets have been uploaded to cdn
    // cdn: '//cdn.upchina.com',
  })
);
app.use(state());
app.use(bodyParser());
app.use(api());
app.use(page());

render(app, {
  root: path.join(__dirname, "view"),
  layout: "layout/index",
  viewExt: "ejs",
  cache: IS_PROD
});

// proxy the webpack assets directory to the webpack-dev-server.
// It is only intended for use in development.
if (IS_DEV) {
  const proxy = require("koa-proxies");
  app.use(
    proxy("/static", {
      target: "http://localhost:3808"
    })
  );
}

export default app;
