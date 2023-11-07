"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var redis_client_1 = __importDefault(require("./redis.client"));
var redis_pub_client_1 = __importDefault(require("./redis.pub.client"));
var redis_sub_client_1 = __importDefault(require("./redis.sub.client"));
exports.default = {
    cache: redis_client_1.default,
    pub: redis_pub_client_1.default,
    sub: redis_sub_client_1.default,
};
