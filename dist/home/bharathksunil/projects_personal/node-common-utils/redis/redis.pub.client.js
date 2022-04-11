"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var ioredis_1 = __importDefault(require("ioredis"));
var options = {
    enableOfflineQueue: false,
    retryStrategy: function (times) {
        return Math.min(times * 100, 3000);
    },
};
var redisConnection = null;
exports.default = (function () {
    if (!redisConnection)
        redisConnection = new ioredis_1.default(process.env.REDIS_PUBSUB_URL, options);
    return redisConnection;
})();
