//server/attendence-service/src/config/redis.ts
import { createClient, RedisClientType } from 'redis';
import { env } from './env';

class RedisConnection {
  private client: RedisClientType;

  constructor() {
    this.client = createClient({
      url: env.REDIS_URL,
    });

    this.client.on('error', (err) => console.error('❌ Redis Client Error:', err));
    this.client.on('connect', () => console.log('✅ Redis connected'));
  }

  async connect(): Promise<void> {
    try {
      await this.client.connect();
    } catch (error) {
      console.error('❌ Redis connection failed:', error);
      throw error;
    }
  }

  async disconnect(): Promise<void> {
    await this.client.disconnect();
  }

  getClient(): RedisClientType {
    return this.client;
  }
}

export const redisConnection = new RedisConnection();
export const redis = redisConnection.getClient();
