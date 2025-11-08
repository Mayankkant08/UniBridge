import { RedisClientType } from 'redis';
declare class RedisConnection {
    private client;
    constructor();
    connect(): Promise<void>;
    disconnect(): Promise<void>;
    getClient(): RedisClientType;
}
export declare const redisConnection: RedisConnection;
export declare const redis: RedisClientType;
export {};
//# sourceMappingURL=redis.d.ts.map