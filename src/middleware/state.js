/**
 * helper middleware for template rendering
 */

import lodash from 'lodash';
import moment from 'moment';

export default function() {
  return async function(ctx, next) {
    ctx.state = Object.assign(ctx.state, {
      lodash,
      moment,
    });
    await next();
  };
}
