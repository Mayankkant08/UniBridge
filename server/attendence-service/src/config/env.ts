//server/attendence-service/src/config/env.ts
import dotenv from 'dotenv';
import { z } from 'zod';

dotenv.config();

const envSchema = z.object({
  NODE_ENV: z.enum(['development', 'production', 'test']).default('development'),
  PORT: z.string().default('3001'),
  DATABASE_URL: z.string(),
  REDIS_URL: z.string().default('redis://localhost:6379'),
  RABBITMQ_URL: z.string(),
  JWT_SECRET: z.string(),
  QR_SECRET_KEY: z.string(),
  QR_EXPIRY_SECONDS: z.string().default('30'),
  CORS_ORIGIN: z.string().default('http://localhost:3000'),
  AUTH_SERVICE_URL: z.string().optional(),
  USER_SERVICE_URL: z.string().optional(),
});

export const env = envSchema.parse(process.env);
