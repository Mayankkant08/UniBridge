"use strict";
//server/attendence-service/src/services/qr.service.ts
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.qrService = exports.QRService = void 0;
const qrcode_1 = __importDefault(require("qrcode"));
const database_1 = require("../config/database");
const redis_1 = require("../config/redis");
const crypto_util_1 = require("../utils/crypto.util");
const env_1 = require("../config/env");
class QRService {
    QR_EXPIRY = parseInt(env_1.env.QR_EXPIRY_SECONDS) || 30;
    REDIS_PREFIX = 'qr:token:';
    async generateQR(teacherId, courseId) {
        const token = crypto_util_1.CryptoUtil.generateToken();
        const expiresAt = new Date(Date.now() + this.QR_EXPIRY * 1000);
        const classDate = new Date().toISOString().split('T')[0] || '';
        const payload = {
            teacherId,
            courseId,
            token,
            expiresAt: expiresAt.getTime(),
            classDate,
        };
        const payloadString = JSON.stringify(payload);
        const signature = crypto_util_1.CryptoUtil.signPayload(payloadString);
        // Store in Redis with expiry
        const redisKey = `${this.REDIS_PREFIX}${token}`;
        await redis_1.redis.setEx(redisKey, this.QR_EXPIRY, JSON.stringify({ ...payload, signature }));
        // Store in database for auditing
        await database_1.prisma.qRToken.create({
            data: {
                teacherId,
                courseId,
                token,
                signature,
                expiresAt,
                isActive: true,
            },
        });
        // Generate QR code image
        const qrData = JSON.stringify({ ...payload, signature });
        const qrCodeData = await qrcode_1.default.toDataURL(qrData);
        return {
            qrCodeData,
            token,
            expiresAt,
            expiresIn: this.QR_EXPIRY,
        };
    }
    async validateQR(qrData) {
        try {
            const parsed = JSON.parse(qrData);
            const { signature, ...payload } = parsed;
            // Verify signature
            const payloadString = JSON.stringify(payload);
            const isSignatureValid = crypto_util_1.CryptoUtil.verifySignature(payloadString, signature);
            if (!isSignatureValid) {
                return { valid: false, error: 'Invalid QR code signature' };
            }
            // Check in Redis first
            const redisKey = `${this.REDIS_PREFIX}${payload.token}`;
            const cachedData = await redis_1.redis.get(redisKey);
            if (!cachedData) {
                return { valid: false, error: 'QR code has expired or is invalid' };
            }
            // Check expiration
            if (Date.now() > payload.expiresAt) {
                await redis_1.redis.del(redisKey);
                return { valid: false, error: 'QR code has expired' };
            }
            return { valid: true, payload };
        }
        catch (error) {
            return { valid: false, error: 'Invalid QR code format' };
        }
    }
    async invalidateQR(token) {
        const redisKey = `${this.REDIS_PREFIX}${token}`;
        await redis_1.redis.del(redisKey);
        await database_1.prisma.qRToken.updateMany({
            where: { token },
            data: { isActive: false },
        });
    }
}
exports.QRService = QRService;
exports.qrService = new QRService();
//# sourceMappingURL=qr.service.js.map