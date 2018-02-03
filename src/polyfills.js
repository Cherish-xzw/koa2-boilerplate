// set default env to `development`
process.env.NODE_ENV = process.env.NODE_ENV || "development";

// set taf env to `production`
if (process.env.TAF_CONFIG) {
  process.env.NODE_ENV = "production";
}

// es6 API polyfill in production
if (process.env.NODE_ENV === "production") {
  require("babel-polyfill");
}

// use babel-register to compile koa middleware in development
if (process.env.NODE_ENV === "development") {
  require("babel-register")({
    ignore: /node_modules\/(?!koa-*)/
  });
}
