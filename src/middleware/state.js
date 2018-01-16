/**
 * helper middleware for template rendering
 */

import _ from "lodash";
import moment from "moment";

export default function() {
  return async function(ctx, next) {
    ctx.state = Object.assign(ctx.state, {
      _,
      moment
    });
    await next();
  };
}
