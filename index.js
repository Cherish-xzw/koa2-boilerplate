require('babel-register')({
  ignore: /node_modules\/(?!koa-*)/,
});
module.exports = require('./src/app.js');
