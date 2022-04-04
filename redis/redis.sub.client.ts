import redis from 'ioredis';

const options = {
  enableOfflineQueue: false,
  retryStrategy(times: number) {
    return Math.min(times * 100, 3000);
  },
};

let redisConnection: redis.Redis | null = null;

export default ((): redis.Redis => {
  if (!redisConnection)
    redisConnection = new redis(process.env.REDIS_PUBSUB_URL, options);
  return redisConnection;
})();
