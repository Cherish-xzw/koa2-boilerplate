import Koa from "koa";
import path from "path";
import render from "koa-ejs";
import serve from "koa-static";
import bodyParser from "koa-bodyparser";

import assets from "./middleware/assets";
import state from "./middleware/state";
import page from "./router/page";
import api from "./router/api";

const app = new Koa();

app.use(
  serve(path.resolve(__dirname, "../public/"), {
    maxage: 1000 * 60 * 60 * 24 * 30 // a month
  })
);
app.use(
  assets({
    publicPath: "/static/"
    // prepend: '//cdn.upchina.com' // If assets have been uploaded to cdn
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
  cache: true
});

// proxy the webpack assets directory to the webpack-dev-server.
// It is only intended for use in development.
if (app.env === "development") {
  const proxy = require("koa-proxies");
  app.use(
    proxy("/static", {
      target: "http://localhost:3808"
    })
  );
}

export default app;
