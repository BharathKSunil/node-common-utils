"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const ioredis_1 = __importDefault(require("ioredis"));
const options = {
    enableOfflineQueue: false,
    retryStrategy(times) {
        return Math.min(times * 100, 3000);
    },
};
let redisConnection = null;
exports.default = (() => {
    if (!redisConnection)
        redisConnection = new ioredis_1.default(process.env.REDIS_PUBSUB_URL, options);
    return redisConnection;
})();
