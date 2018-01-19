if (process.env.TAF_CONFIG) {
  process.env.NODE_ENV = 'production'
}

require('babel-register')({
  ignore: /node_modules\/(?!koa-*)/,
});
require('babel-polyfill');

module.exports = require('./src/app.js');
