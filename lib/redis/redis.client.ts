import { Redis, RedisOptions } from 'ioredis';

const options = <RedisOptions>{
  enableOfflineQueue: false,
  retryStrategy(times: number) {
    return Math.min(times * 100, 3000);
  },
};

let redisConnection: Redis | null = null;

export default ((): Redis => {
  if (!redisConnection)
    redisConnection = new Redis(process.env.REDIS_CACHE_URL!!, options);
  return redisConnection;
})();
