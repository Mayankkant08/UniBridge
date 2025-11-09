"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.env = void 0;
//server/attendence-service/src/config/env.ts
const dotenv_1 = __importDefault(require("dotenv"));
const zod_1 = require("zod");
dotenv_1.default.config();
const envSchema = zod_1.z.object({
    NODE_ENV: zod_1.z.enum(['development', 'production', 'test']).default('development'),
    PORT: zod_1.z.string().default('3001'),
    DATABASE_URL: zod_1.z.string(),
    REDIS_URL: zod_1.z.string().default('redis://localhost:6379'),
    RABBITMQ_URL: zod_1.z.string(),
    JWT_SECRET: zod_1.z.string(),
    QR_SECRET_KEY: zod_1.z.string(),
    QR_EXPIRY_SECONDS: zod_1.z.string().default('30'),
    CORS_ORIGIN: zod_1.z.string().default('http://localhost:3000'),
    AUTH_SERVICE_URL: zod_1.z.string().optional(),
    USER_SERVICE_URL: zod_1.z.string().optional(),
});
exports.env = envSchema.parse(process.env);
//# sourceMappingURL=env.js.map