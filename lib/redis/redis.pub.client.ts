import { Redis, RedisOptions } from 'ioredis';

export default (options: RedisOptions): Redis => {
  const redisConnection = new Redis(process.env.REDIS_PUBSUB_URL!, options);
  return redisConnection;
};
