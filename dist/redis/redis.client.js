"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var ioredis_1 = require("ioredis");
var options = {
    enableOfflineQueue: false,
    retryStrategy: function (times) {
        return Math.min(times * 100, 3000);
    },
};
var redisConnection = null;
exports.default = (function () {
    if (!redisConnection)
        redisConnection = new ioredis_1.Redis(process.env.REDIS_CACHE_URL, options);
    return redisConnection;
})();
