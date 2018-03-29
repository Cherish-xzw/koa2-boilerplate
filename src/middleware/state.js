/**
 * helper middleware for template rendering
 */

import _ from "lodash";
import moment from "moment";
import pkg from "../../package.json";

export default function() {
  return async function(ctx, next) {
    ctx.state = Object.assign(ctx.state, {
      production: ctx.app.env === "production",
      _,
      moment,
      publicPath: pkg.path
    });
    await next();
  };
}
