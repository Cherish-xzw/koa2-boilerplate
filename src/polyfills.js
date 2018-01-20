if (process.env.TAF_CONFIG) {
  process.env.NODE_ENV = 'production'
}
if (process.env.NODE_ENV === 'development'){
  require('babel-register')({
    ignore: /node_modules\/(?!koa-*)/,
  });
}

