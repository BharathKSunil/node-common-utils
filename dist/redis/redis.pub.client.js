"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var ioredis_1 = require("ioredis");
exports.default = (function (options) {
    var redisConnection = new ioredis_1.Redis(process.env.REDIS_PUBSUB_URL, options);
    return redisConnection;
});
