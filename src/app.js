import Koa from "koa";
import path from "path";
import render from "koa-ejs";
import serve from "koa-static";
import bodyParser from "koa-bodyparser";

import assets from "./middleware/assets";
import state from "./middleware/state";
import page from "./router/page";
import api from "./router/api";

const PORT = process.env.HTTP_PORT || 3000;
const IP = process.env.HTTP_IP || undefined;
const IS_DEV = process.env.NODE_ENV === "development";
const IS_PROD = process.env.NODE_ENV === "production";

const app = new Koa();

render(app, {
  root: path.join(__dirname, "view"),
  layout: "layout/index",
  viewExt: "ejs",
  cache: IS_PROD
});

if (IS_DEV) {
  const webpack = require("webpack");
  const dev = require("./middleware/dev");
  const webpackConfig = require("../build/webpack.config");
  const compiler = webpack(webpackConfig);
  app.use(
    dev(compiler, {
      publicPath: webpackConfig.output.publicPath,
      stats: { colors: true }
    })
  );
}

app.use(
  serve(path.resolve(__dirname, "./public/"), {
    maxage: 1000 * 60 * 60 * 24 * 30 // a month
  })
);
app.use(
  assets({
    env: process.env.NODE_ENV,
    manifestPath: path.join(__dirname, "public/static/", "manifest.json"),
    outPath: "/static"
    // If assets have been uploaded to cdn
    // cdn: '//cdn.upchina.com',
  })
);
app.use(state());
app.use(bodyParser());
app.use(api());
app.use(page());

app.listen(PORT, IP, () => {
  console.log(
    `============= [app started at http://${IP ? IP : "localhost"}:${PORT}]============= `
  );
});

export default app;
