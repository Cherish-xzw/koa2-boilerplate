module.exports = (
  options = {
    publicPath: "",
    prepend: ""
  }
) => {
  return async (ctx, next) => {
    ctx.state.asset_path = assetName => {
      const name = assetName.split(".")[0];
      const suffix = assetName.split(".")[1];
      let url = "";
      if (ctx.app.env === "development") {
        url += `${options.publicPath}${name}.${suffix}`;
      }
      if (ctx.app.env === "production") {
        if (options.prepend) {
          url += options.prepend;
        }
        url += ctx.app.assetsManifest[name][suffix];
      }
      return url;
    };
    await next();
  };
};
