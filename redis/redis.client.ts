import redis from 'ioredis';

const options = <redis.RedisOptions>{
  enableOfflineQueue: false,
  retryStrategy(times: number) {
    return Math.min(times * 100, 3000);
  },
};

let redisConnection: redis.Redis | null = null;

export default ((): redis.Redis => {
  if (!redisConnection)
    redisConnection = new redis(process.env.REDIS_CACHE_URL, options);
  return redisConnection;
})();
