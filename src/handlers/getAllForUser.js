// @flow

import R from 'ramda';
import to from 'await-to-js';
import type { Handler } from '../types';
import { controller } from './factory';
import { errorRes } from '../utils/http';

export const handler: Handler = async event => {
  const userId = R.path(['pathParameters', 'userId'], event);
  const channelPref = R.path(['queryStringParameters', 'channel'], event);
  const [err, result] = await to(controller.getAllForUser(userId, channelPref));

  if (err != null) {
    console.log(err);
    return errorRes(500, err.message);
  }
  return result.length !== 0
    ? { statusCode: 200, body: result }
    : { statusCode: 404 };
};
