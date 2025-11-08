"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.redis = exports.redisConnection = void 0;
//server/attendence-service/src/config/redis.ts
const redis_1 = require("redis");
const env_1 = require("./env");
class RedisConnection {
    client;
    constructor() {
        this.client = (0, redis_1.createClient)({
            url: env_1.env.REDIS_URL,
        });
        this.client.on('error', (err) => console.error('❌ Redis Client Error:', err));
        this.client.on('connect', () => console.log('✅ Redis connected'));
    }
    async connect() {
        try {
            await this.client.connect();
        }
        catch (error) {
            console.error('❌ Redis connection failed:', error);
            throw error;
        }
    }
    async disconnect() {
        await this.client.disconnect();
    }
    getClient() {
        return this.client;
    }
}
exports.redisConnection = new RedisConnection();
exports.redis = exports.redisConnection.getClient();
//# sourceMappingURL=redis.js.map