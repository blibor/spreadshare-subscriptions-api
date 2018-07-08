// @flow

import R from 'ramda';
import middy from 'middy';
import to from 'await-to-js';
import { jsonBodyParser, validator } from 'middy/middlewares';
import type { Handler } from '../types';
import httpJsonErrorHandler from '../middlewares/httpJsonErrorHandler';
import { subscriptionSchema } from '../schemas';
import { controller } from './factory';
import { errorRes } from '../utils/http';

const subscribe: Handler = async event => {
  const subscription = R.merge(event.pathParameters, event.body);
  const [err, item] = await to(controller.subscribe(subscription));
  if (err != null) {
    console.log(err);
    return errorRes(500, err.message);
  }
  return { statusCode: 200, body: item };
};

export const handler = middy(subscribe)
  .use(jsonBodyParser())
  .use(validator({ inputSchema: subscriptionSchema }))
  .use(httpJsonErrorHandler());
