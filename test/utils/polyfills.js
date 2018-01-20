require("babel-register")({
  ignore: /node_modules\/(?!koa-*)/
});
require("babel-polyfill");
require("should");
