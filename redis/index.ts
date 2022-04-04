import redisClient from './redis.client';
import redisPubClient from './redis.pub.client';
import redisSubClient from './redis.sub.client';

export default {
  cache: redisClient,
  pub: redisPubClient,
  sub: redisSubClient,
};
